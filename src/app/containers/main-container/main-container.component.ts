import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {
  selectGithubIsLoading,
  selectRepositories,
  selectSavedDateInput,
  selectSavedFilterInput,
  selectSavedSearchInput
} from '../../store/github/github.selectors';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app.state';
import {combineLatest, fromEvent, merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, takeUntil, tap} from 'rxjs/operators';
import {LoadGithub, SaveDateInput, SaveFilterInput, SaveSearchInput} from '../../store/github/github.actions';
import {GithubItem} from '../../store/github/github.reducer';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('githubSearch') searchInput: ElementRef;
  @ViewChild('nameFilter') filterInput: ElementRef;
  @ViewChild('dateFilter') dateInput: ElementRef;

  public isLoading$ = this.store.select(selectGithubIsLoading);
  public repositories$: Observable<GithubItem[]>;

  private subscription$ = new Subject<boolean>();
  private filter$: Observable<string>;
  private date$: Observable<Date>;
  private search$: Observable<string>;

  constructor(private store: Store<IAppState>) {
  }

  ngAfterViewInit(): void {
    /**
     * Will cause non-fatal error, if do this after view checked binding without setTimeout of RequestAnimationFrame
     */
    setTimeout(() => {
      this.init();
      this.loadInputs();

      const storeRepositories$ = this.store.select(selectRepositories);

      this.repositories$ = combineLatest([
        storeRepositories$,
        this.filter$,
        this.date$
      ]).pipe(
        map(([repos, filter, date]) => {
          return repos.filter(repo => repo.name.includes(filter) && new Date(repo.pushed_at) > date);
        })
      );
    });
  }

  private init(): void {
    this.filter$ = merge(fromEvent(this.filterInput.nativeElement, 'input')
      .pipe(
        takeUntil(this.subscription$),
        map((input: InputEvent) => (input.target as any).value.trim()),
        startWith('')
      ), this.store.select(selectSavedFilterInput));
    this.filter$.subscribe();

    this.date$ = merge(fromEvent(this.dateInput.nativeElement, 'input')
      .pipe(
        takeUntil(this.subscription$),
        map((input: InputEvent) => new Date((input.target as any).value)),
        startWith(new Date(this.dateInput.nativeElement.value)),
      ), this.store.select(selectSavedDateInput));

    this.search$ = fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        takeUntil(this.subscription$),
        map((input: InputEvent) => (input.target as any).value.trim()),
        debounceTime(400),
        distinctUntilChanged(),
        tap(input => this.store.dispatch(new LoadGithub(input))),
      );
    this.search$.subscribe();
  }

  /**
   * Just visual stuff for UI/UX
   */
  private loadInputs(): void {
    /**
     * We can go as take(1) actually
     */
    const search = this.store.select(selectSavedSearchInput)
      .pipe(
        takeUntil(this.subscription$)
      );
    search.subscribe(input => {
      this.searchInput.nativeElement.value = input;
    });

    const date = this.store.select(selectSavedDateInput)
      .pipe(
        takeUntil(this.subscription$)
      );
    date.subscribe((input) => {
      this.dateInput.nativeElement.value = input.toJSON().slice(0, 10); // Convert to YYYY-MM-DD
    });

    const filter = this.store.select(selectSavedFilterInput)
      .pipe(
        takeUntil(this.subscription$)
      );
    filter.subscribe(input => {
      this.filterInput.nativeElement.value = input;
    });
  }

  /**
   * Save inputs when user leave page, so we can retrieve them again from ngrx
   */
  private saveInputs(): void {
    this.store.dispatch(new SaveDateInput(new Date(this.dateInput.nativeElement.value)));
    this.store.dispatch(new SaveFilterInput(this.filterInput.nativeElement.value));
    this.store.dispatch(new SaveSearchInput(this.searchInput.nativeElement.value));
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();

    this.saveInputs();
  }

}

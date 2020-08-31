import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {selectGithubIsLoading, selectRepositories, selectSavedSearchInput} from '../../store/github/github.selectors';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app.state';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, takeUntil, tap} from 'rxjs/operators';
import {LoadGithub, SaveSearchInput} from '../../store/github/github.actions';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('githubSearch') searchInput: ElementRef;

  public repositories$ = this.store.select(selectRepositories);
  public isLoading$ = this.store.select(selectGithubIsLoading);
  private subscription$ = new Subject<boolean>();

  constructor(private store: Store<IAppState>) {
  }

  ngAfterViewInit(): void {
    this.store.select(selectSavedSearchInput)
      .pipe(
        takeUntil(this.subscription$)
      )
      .subscribe(input => {
        this.searchInput.nativeElement.value = input;
      });

    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        takeUntil(this.subscription$),
        map((input: InputEvent) => (input.target as any).value.trim()),
        debounceTime(400),
        distinctUntilChanged(),
        tap(input => this.store.dispatch(new LoadGithub(input))),
        tap(input => this.store.dispatch(new SaveSearchInput(input)))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IAppState} from '../../store/app.state';
import {Store} from '@ngrx/store';
import {selectGithubRepository} from '../../store/github/github.selectors';
import {LoadRepository} from '../../store/github/github.actions';

@Component({
  selector: 'app-github-item-container',
  templateUrl: './github-item-container.component.html',
  styleUrls: ['./github-item-container.component.scss']
})
export class GithubItemContainerComponent implements OnInit {

  public repository$ = this.store.select(selectGithubRepository);
  constructor(private router: ActivatedRoute, private store: Store<IAppState>) { }

  ngOnInit(): void {
    const params = this.router.snapshot.params;
    this.store.dispatch(new LoadRepository({
      owner: params.owner,
      repo: params.repo
    }));
  }

  public copyToClipboard(input: HTMLInputElement): void {
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }

}

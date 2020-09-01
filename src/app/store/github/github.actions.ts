import { Action } from '@ngrx/store';
import {GithubItem, GithubState} from './github.reducer';
import {GithubRepositoryRequest} from '../../services/github.service';

export enum GithubActionTypes {
  LoadGithub = '[Github] Load Github',
  LoadGithubSuccess = '[Github] Load Github Success',
  LoadGithubFailure = '[Github] Load Github Failure',
  LoadRepository = '[Github] Load Repository',
  LoadRepositorySuccess = '[Github] Load Repository Success',
  LoadRepositoryFailure = '[Github] Load Repository Failure',
  SaveSearchInput = '[Github] Save Search Input',
  SaveFilterInput = '[Github] Save Filter Input',
  SaveDateInput = '[Github] Save Date Input',
}

export class LoadGithub implements Action {
  readonly type = GithubActionTypes.LoadGithub;
  constructor(public payload: string) {}
}

export class LoadGithubSuccess implements Action {
  readonly type = GithubActionTypes.LoadGithubSuccess;
  constructor(public payload: GithubState) { }
}

export class LoadGithubFailure implements Action {
  readonly type = GithubActionTypes.LoadGithubFailure;
}

export class LoadRepository implements Action {
  readonly type = GithubActionTypes.LoadRepository;
  constructor(public payload: GithubRepositoryRequest) {}
}

export class LoadRepositorySuccess implements Action {
  readonly type = GithubActionTypes.LoadRepositorySuccess;
  constructor(public payload: GithubItem) {}
}

export class LoadRepositoryFailure implements Action {
  readonly type = GithubActionTypes.LoadRepositoryFailure;
}

export class SaveSearchInput implements Action {
  readonly type = GithubActionTypes.SaveSearchInput;
  constructor(public payload: string) {}
}

export class SaveFilterInput implements Action {
  readonly type = GithubActionTypes.SaveFilterInput;
  constructor(public payload: string) {}
}

export class SaveDateInput implements Action {
  readonly type = GithubActionTypes.SaveDateInput;
  constructor(public payload: Date) {}
}

export type GithubActions = LoadGithub | LoadGithubSuccess | LoadGithubFailure |
  LoadRepository | LoadRepositorySuccess | LoadRepositoryFailure | SaveSearchInput | SaveFilterInput | SaveDateInput;


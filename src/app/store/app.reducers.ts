import {ActionReducerMap} from '@ngrx/store';
import {IAppState} from './app.state';
import {githubReducer, initialGithubState} from './github/github.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  github: githubReducer
};

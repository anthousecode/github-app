import {GithubState, initialGithubState} from './github/github.reducer';

export interface IAppState {
  github: GithubState;
  // router?: RouterReducerState;
}

export const initialAppState: IAppState = {
  github: initialGithubState
};

export function getInitialState(): IAppState {
  return initialAppState;
}

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGithub from './github.reducer';
import {GithubState} from './github.reducer';

export const selectGithubState = createFeatureSelector<fromGithub.GithubState>(
  fromGithub.githubFeatureKey
);

export const selectRepositories = createSelector(selectGithubState, (state: GithubState) => state.items);
export const selectGithubIsLoading = createSelector(selectGithubState, (state: GithubState) => state.isLoading);
export const selectGithubRepository = createSelector(selectGithubState, (state: GithubState) => state.selectedItem);
export const selectSavedSearchInput = createSelector(selectGithubState, (state: GithubState) => state.searchInput);

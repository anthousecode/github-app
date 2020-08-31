import {GithubActions, GithubActionTypes} from './github.actions';

export const githubFeatureKey = 'github';

export interface GithubItem {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  homepage: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  html_url: string;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
  };
}

export interface GithubState {
  total_count: number;
  items: GithubItem[];
  isLoading: boolean;
  selectedItem: GithubItem;
  searchInput: string;
}

export const initialGithubState: GithubState = {
  total_count: 0,
  items: [],
  isLoading: false,
  selectedItem: null,
  searchInput: ''
};

export function githubReducer(state = initialGithubState, action: GithubActions): GithubState {
  switch (action.type) {

    case GithubActionTypes.LoadGithub:
      return {
        ...state,
        isLoading: true
      };

    case GithubActionTypes.LoadGithubSuccess:
      return {
        ...state,
        total_count: action.payload.total_count,
        items: action.payload.items,
        isLoading: false
      };

    case GithubActionTypes.LoadGithubFailure:
      return initialGithubState;

    case GithubActionTypes.LoadRepositorySuccess:
      return {
        ...state,
        selectedItem: action.payload
      };

    case GithubActionTypes.SaveSearchInput:
      return {
        ...state,
        searchInput: action.payload
      };

    default:
      return state;
  }
}

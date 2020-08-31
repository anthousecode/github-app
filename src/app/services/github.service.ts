import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GithubItem, GithubState} from '../store/github/github.reducer';
import {Observable} from 'rxjs';

export interface GithubRepositoryRequest {
  owner: string;
  repo: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  static API_URL = 'https://api.github.com/';

  constructor(private http: HttpClient) {
  }

  searchRepositories(query: string): Observable<GithubState> {
    return this.http.get<GithubState>(`${GithubService.API_URL}search/repositories`, {
      params: {
        q: query
      }
    });
  }

  getRepository(request: GithubRepositoryRequest): Observable<GithubItem> {
    return this.http.get<GithubItem>(`${GithubService.API_URL}repos/${request.owner}/${request.repo}`);
  }
}

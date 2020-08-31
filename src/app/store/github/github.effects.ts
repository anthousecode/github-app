import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GithubActions, GithubActionTypes, LoadGithub, LoadGithubSuccess, LoadRepository, LoadRepositorySuccess} from './github.actions';
import {GithubService} from '../../services/github.service';
import {initialGithubState} from './github.reducer';


@Injectable()
export class GithubEffects {

  @Effect()
  loadGithub$ = this.actions$.pipe(
    ofType<LoadGithub>(GithubActionTypes.LoadGithub),
    switchMap(query => {
      return this.github.searchRepositories(query.payload)
        .pipe(
          catchError(() => {
            return of(initialGithubState);
          })
        );
    }),
    mergeMap(data => {
      return [new LoadGithubSuccess(data)];
    }),
  );

  @Effect()
  loadRepository$ = this.actions$.pipe(
    ofType<LoadRepository>(GithubActionTypes.LoadRepository),
    switchMap(data => {
      return this.github.getRepository(data.payload)
        .pipe(
          catchError(() => {
            return of(null);
          })
        );
    }),
    mergeMap(data => {
      return [new LoadRepositorySuccess(data)];
    })
  );


  constructor(private actions$: Actions<GithubActions>, private github: GithubService) {
  }

}

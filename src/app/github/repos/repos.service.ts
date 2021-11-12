import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { coreError, isOk } from '../../core';
import { GithubService, Repos } from '../github.service';
import { WexHttpClient, WexHttpResult } from '../../core/wex-http-client';

export interface SideEffectResult {
    entityId: number;
}

@Injectable(
  {
    providedIn: 'root',
}
)
export class ReposService {
  constructor(private readonly githubService: GithubService, private readonly wexHttpClient: WexHttpClient) {}

  public loadRepos(searchTerm: Observable<string>): Repos {
    return searchTerm.pipe(
      distinctUntilChanged(),
      debounceTime(100),
      switchMap((term: string) => this.githubService.search(term)),
      map((repos) => {
        if (isOk(repos)) {
          if (repos.length < 10) {
            return coreError(new Error('Length < 10'));
          }
        }
        return repos;
      }),
    );
  }

  public post(): WexHttpResult<SideEffectResult> {
    return this.wexHttpClient.request(c =>
        c.post<SideEffectResult>('https://myend.free.beeceptor.com/', {}));
  }
}

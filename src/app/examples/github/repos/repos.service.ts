import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { coreError, isOk } from '../../../core';
import { GithubStorage, Repos } from '../github.service';

@Injectable({
  providedIn: 'root',
})
export class ReposStorage {
  constructor(private readonly githubService: GithubStorage) {}

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
}

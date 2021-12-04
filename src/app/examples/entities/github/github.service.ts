import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreResult, wrap } from '../../../core';

interface Repo {
  readonly name: string;
}

export type Repos = Observable<CoreResult<Repo[]>>;

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  /*
  Original impl:
  constructor(private readonly http: HttpClient) { }
  public search(term: string): Repos {
    return this.http.get<{ items: Repo[] }>(`https://api.github.com/search/repositories?q=${term}`).pipe(
      map((res) => res.items),
      catchHttpError(),
      startWith(pending()),
    );
  }
  */
  constructor(private readonly http: HttpClient) {}
  public search(term: string): Repos {
    return this.http.get<{ items: Repo[] }>(`https://api.github.com/search/repositories?q=${term}`).pipe(
      map((res) => res.items),
      wrap(),
    );
  }
}

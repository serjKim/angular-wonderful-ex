import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreHttpClient, CoreResult } from '../core';

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
  constructor(private readonly http: CoreHttpClient) {}
  public search(term: string): Repos {
    return this.http.request((c) =>
      c.get<{ items: Repo[] }>(`https://api.github.com/search/repositories?q=${term}`).pipe(map((res) => res.items)),
    );
  }
}

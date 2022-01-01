import { Injectable } from '@angular/core';
import { interval, map, Observable, of } from 'rxjs';
import { NavLink, SideNavLinksStorage } from './layout';

@Injectable()
export class ExampleNavLinksStorageService extends SideNavLinksStorage {
  public get links(): Observable<readonly NavLink[]> {
    return of([
      new NavLink(
        ['entities'],
        'An entities direct link and very long text',
        'folder',
        of('9'),
        '',
        of([
          new NavLink(['entities', 1636834527025], '1636834527025', 'description', of('1')),
          new NavLink(['entities', 1636834529017], 'Another one', 'description'),
          new NavLink(['entities', 1636834530105], 'Another two', 'description'),
          new NavLink(['entities', 1636834531145], 'Link three', 'description'),
        ]),
      ),
      new NavLink(['github'], 'Github', 'settings', of('8'), 'red'),
      new NavLink(['a', 'b', 'c'], 'A link', 'calendar_today', of('99'), 'amber'),
      new NavLink(['a', 'b', 'c'], 'Wrong link', 'favorite', of(null)),
      new NavLink(['a', 'b', 'c'], 'A link with a very long long text', 'home'),
      new NavLink(
        ['a', 'b', 'c'],
        'Another link',
        'fingerprint',
        interval(1000).pipe(map((x) => x.toString())),
        'green',
      ),
    ]);
  }
}
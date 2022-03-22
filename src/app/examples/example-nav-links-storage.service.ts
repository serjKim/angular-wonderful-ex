import { Injectable } from '@angular/core';
import { interval, map, of } from 'rxjs';
import { NavLink, SideNavLinksStorage } from '../layout';

@Injectable()
export class ExampleNavLinksStorage extends SideNavLinksStorage {
  public readonly links = of([
    new NavLink(['playground'], 'Playground', 'home', of('1')),
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
        new NavLink(['entities', 1636], 'Invalid link', 'description'),
      ]),
    ),
    new NavLink(['github'], 'Github', 'settings', of('8'), 'red'),
    new NavLink(['simple-confirmation'], 'Simple Confirmation Dialog', 'contact_support', of('')),
    new NavLink(['a', 'b', 'c'], 'A link', 'calendar_today', of('99'), 'amber'),
    new NavLink(['a', 'b', 'c'], 'Wrong link', 'favorite', of(null)),
    new NavLink(['a', 'b', 'c'], 'A link with a very long long text', 'home'),
    new NavLink(
      ['a', 'b', 'c'],
      'Another link',
      'fingerprint',
      interval(1000).pipe(map((x) => (x > 0 ? x.toString() : ''))),
      'green',
    ),
  ]);
}

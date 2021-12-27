import { Observable, of } from 'rxjs';

export class NavLink {
  constructor(
    public readonly url: unknown[],
    public readonly label: string,
    public readonly icon: string,
    public readonly badge: Observable<string | null> = of(null),
    public readonly cssClass: string = '',
    public readonly children: Observable<NavLink[]> = of([]),
  ) {}
}

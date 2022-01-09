import { Observable } from 'rxjs';
import { NavLink } from '../sidenav-link';

export abstract class SideNavLinksStorage {
  public abstract get links(): Observable<readonly NavLink[]>;
}

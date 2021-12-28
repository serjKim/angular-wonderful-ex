import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Repos } from '../github.service';
import { ReposService } from './repos.service';

@Component({
  selector: 'wex-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReposComponent {
  public readonly searchControl = new FormControl('');
  public readonly repos$: Repos;
  public allowEditor = true;

  constructor(reposService: ReposService) {
    this.repos$ = reposService.loadRepos(this.searchControl.valueChanges as Observable<string>);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { CoreResultError, Pending } from '../../core';
import { ReposService, SideEffectResult } from '../repos/repos.service';

@Component({
  selector: 'wex-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  public readonly sideEffect$ = new Subject<Observable<SideEffectResult | CoreResultError | Pending>>();
  public readonly createdEntity$ = this.sideEffect$.pipe(exhaustMap((x) => x));

  constructor(private readonly reposService: ReposService) {}

  public doEffect(entityId: number | null | undefined): void {
    if (!entityId) {
      const source = this.reposService.post();
      this.sideEffect$.next(source);
    } else {
      console.log('editing...');
    }
  }
}

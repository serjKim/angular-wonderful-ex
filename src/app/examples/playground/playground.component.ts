import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Roulette, RouletteStorage } from '../roulette-storage.service';
import { Items, StorageService } from '../storage.service';

@Component({
  selector: 'wex-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent {
  public readonly title = 'wonderful-ex';
  public readonly items$: Observable<Items>;
  public readonly roulette$: Observable<Roulette>;
  public allowLoad = true;
  public allowRoulette = false;

  constructor(private readonly storageService: StorageService, rouletteStorage: RouletteStorage) {
    this.items$ = storageService.getItems();
    this.roulette$ = rouletteStorage.load();
  }

  public onLoad(): void {
    this.storageService.load();
  }

  public raiseError(): void {
    // eslint-disable-next-line no-throw-literal
    throw 111;
  }
}

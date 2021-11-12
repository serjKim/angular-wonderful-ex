import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Roulette, RouletteStorage } from './roulette-storage.service';
import { Items, StorageService } from './storage.service';

@Component({
  selector: 'wex-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly title = 'wonderful-ex';
  public readonly items$: Observable<Items>;
  public readonly roulette$: Observable<Roulette>;
  public allowLoad = true;
  public allowRoulette = false;

  constructor(private readonly storageService: StorageService, private readonly rouletteStorage: RouletteStorage) {
    this.items$ = storageService.getItems();
    this.roulette$ = rouletteStorage.load();
  }

  public onLoad(): void {
    this.storageService.load();
  }
}

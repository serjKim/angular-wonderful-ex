import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wex-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
  @Input()
  public massValue = 0;

  @Input()
  public a = 0;

  @Input()
  public b = 1;

  @Input()
  public c = 2;

  @Input()
  public d = 2;

  @Input()
  public e = 2;

  @Input()
  public f = 2;

  constructor() {}

  public ngOnInit(): void {}
}

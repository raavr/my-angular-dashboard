import { Component, Input } from '@angular/core';
import { MoveDaysFrameService } from '../move-items/move-days.service';
import { MOVE_DIR } from '../move-items/move-days';
import { DateRange } from '../resources-model/date-range';

@Component({
  selector: 'res-date-range',
  templateUrl: './resources-date-range.component.html',
  styleUrls: [
    './resources-date-range.component.scss'
  ]
})
export class ResourcesDateRangeComponent {
  @Input() dateRange: DateRange;

  constructor(private moveDaysService: MoveDaysFrameService) { }

  moveDaysLeft() {
    this.moveDaysService.move(MOVE_DIR.LEFT);
  }

  moveDaysRight() {
    this.moveDaysService.move(MOVE_DIR.RIGHT);
  }
}
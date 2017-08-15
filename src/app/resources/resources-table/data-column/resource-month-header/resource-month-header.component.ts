import { Component, Input } from '@angular/core';
import { MoveDaysFrameService } from '../../move-items/move-days.service';
import { MOVE_DIR } from '../../move-items/move-days';
import { DateRange } from '../../../resource/date-range';

@Component({
    selector: 'res-month-header',
    templateUrl: './resource-month-header.component.html',
    styleUrls: [ 
        './resource-month-header.component.scss'
    ]
})
export class ResourceMonthHeaderComponent {
    @Input() dateRange: DateRange;

    constructor(private moveDaysService: MoveDaysFrameService) {}

    moveDaysLeft() {
        this.moveDaysService.move(MOVE_DIR.LEFT);
    }

    moveDaysRight() {
        this.moveDaysService.move(MOVE_DIR.RIGHT);
    }
}
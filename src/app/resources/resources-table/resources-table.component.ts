import { Component, Input } from '@angular/core';
import { MoveDaysFrameService } from './move-items/move-days.service';
import { TransformResourcesService } from './transform-resources.service';
import { Resource } from '../resource/resource';
import { ViewResource } from '../resource/view-resource';
import { DateRange } from '../resource/date-range';

@Component({
    selector: 'res-table',
    templateUrl: './resources-table.component.html',
    styleUrls: [ 
        './resources-table.component.scss'
    ]
})
export class ResourcesTableComponent {
    @Input() resources: Resource[];
    viewResource: ViewResource[];
    days: Date[];
    dateRange: DateRange;

    constructor(private moveDaysService: MoveDaysFrameService, private transformResourcesService: TransformResourcesService) { }

    ngOnInit() {
        this.dateRange = new DateRange(new Date("05-12-2017"), new Date("06-06-2017"));
        this.days = this.transformResourcesService.getDaysList(this.dateRange);
        
        this.transformResourcesService
            .transformResourcesData(this.resources, this.dateRange)
            .subscribe((elem) => this.viewResource = elem); 
    }

}
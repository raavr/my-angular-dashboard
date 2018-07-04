import { Component, Input } from '@angular/core';
import { MoveDaysFrameService } from './move-items/move-days.service';
import { TransformResourcesService } from './transform-resources.service';
import { Resource } from '../resource/resource';
import { ViewResource, ViewProject } from '../resource/view-resource';
import { DateRange } from '../resource/date-range';
import { SelectedProject } from './header-column/resource-item-header/resource-item-header.component';
import { Subject } from 'rxjs/Subject';

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
    unsub$ = new Subject<any>();

    constructor(private moveDaysService: MoveDaysFrameService, private transformResourcesService: TransformResourcesService) { }

    ngOnInit() {
        this.dateRange = new DateRange(new Date("05-12-2017"), new Date("06-06-2017"));
        this.days = this.transformResourcesService.getDaysList(this.dateRange);
        
        this.transformResourcesService
            .transformResourcesData(this.resources, this.dateRange)
            .takeUntil(this.unsub$)
            .subscribe((elem) => this.viewResource = elem); 
    }

    ngOnDestroy() {
        this.unsub$.next();
        this.unsub$.complete();
    }

    assignValue(selectedProject: SelectedProject) {
        const projectDatetimesList = this.transformResourcesService.createDefaultProjectDatetimeList(this.dateRange);
        const viewProject = new ViewProject(selectedProject.value, projectDatetimesList);
        this.viewResource[selectedProject.position].viewProjects.push(viewProject);
    }
}
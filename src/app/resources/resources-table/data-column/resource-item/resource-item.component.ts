import { Component, Input } from '@angular/core';
import { ViewResource } from '../../../resource/view-resource';
import { ExpandCollapseItemsService } from '../../move-items/expand-collapse-items.service';
import { Subject } from 'rxjs/Subject';

const MAX_HOURS = 8;

@Component({
    selector: 'res-item',
    templateUrl: './resource-item.component.html',
    styleUrls: [
        './resource-item.component.scss'
    ]
})
export class ResourceItemComponent {
    @Input() resItem: ViewResource;
    @Input() position: number;

    expanded: boolean = false;
    unsub$ = new Subject<any>();

    constructor(private expandCollapseItemService: ExpandCollapseItemsService) { }

    ngOnInit() {
        this.expandCollapseItemService.expandItem$
            .takeUntil(this.unsub$)
            .subscribe((expandedItem) => {
                if (expandedItem.position === this.position) {
                    this.expanded = expandedItem.expand;
                }
            })
    }

    countMaxHoursPerSubitem(projIdx: number, dayIdx: number) {
        return MAX_HOURS - this.resItem.viewDays[dayIdx].workingHours + this.resItem.viewProjects[projIdx].viewDays[dayIdx].workingHours;
    }

    updateDaysHours(newValue: number, projIdx: number, dayIdx: number) {
        let currentWorkingHours = this.resItem.viewProjects[projIdx].viewDays[dayIdx].workingHours;
        this.resItem.viewProjects[projIdx].viewDays[dayIdx].workingHours = newValue;
        this.resItem.viewDays[dayIdx].workingHours = this.resItem.viewDays[dayIdx].workingHours - currentWorkingHours + newValue;
    }

    expandCollapseItem() {
        this.expandCollapseItemService.expandItem({ position: this.position, expand: !this.expanded });
    }

    ngOnDestroy() {
        this.unsub$.next();
        this.unsub$.complete();
    }
}
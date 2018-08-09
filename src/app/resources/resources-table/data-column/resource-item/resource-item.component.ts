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
      .filter(expandedItem => expandedItem.position === this.position)
      .map(expandedItem => expandedItem.expand)
      .takeUntil(this.unsub$)
      .subscribe(expanded => this.expanded = expanded);
  }

  countMaxHoursPerSubitem(projIdx: number, dateIdx: number) {
    return MAX_HOURS 
      - this.resItem.summedHoursPerDate[dateIdx].workingHours 
      + this.resItem.projectHoursPerDate[projIdx].hoursPerDate[dateIdx].workingHours;
  }

  updateDaysHours(newValue: number, projIdx: number, dateIdx: number) {
    const currentWorkingHours = this.resItem.projectHoursPerDate[projIdx].hoursPerDate[dateIdx].workingHours;
    this.resItem.projectHoursPerDate[projIdx].hoursPerDate[dateIdx].workingHours = newValue;
    this.resItem.summedHoursPerDate[dateIdx].workingHours = this.resItem.summedHoursPerDate[dateIdx].workingHours - currentWorkingHours + newValue;
  }

  expandCollapseItem() {
    this.expandCollapseItemService.expandItem({ position: this.position, expand: !this.expanded });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
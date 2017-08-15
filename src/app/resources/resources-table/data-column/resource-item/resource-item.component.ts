import { Component, Input } from '@angular/core';
import { ViewResource } from '../../../resource/view-resource';
import { ExpandCollapseItemsService } from '../../move-items/expand-collapse-items.service';
import { Subscription } from 'rxjs/Subscription';

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
    expandItemSubscription: Subscription;

    constructor(private expandCollapseItemService: ExpandCollapseItemsService) {}

    ngOnInit() {
        this.expandItemSubscription = this.expandCollapseItemService.expandItem$.subscribe((expandedItem) => {
            if(expandedItem.position === this.position) {
                this.expanded = expandedItem.expand;
            }
        })
    }

    workingHoursItemOnClick(b, c) {
        let currentTime = this.resItem.viewProjects[b].viewDays[c].workingHours;
        this.resItem.viewProjects[b].viewDays[c].workingHours = 8; 
        this.resItem.viewDays[c].workingHours = this.resItem.viewDays[c].workingHours - currentTime + 8;
    }

    ngOnDestroy() {
        this.expandItemSubscription.unsubscribe();
    }
}
import { Component, Input } from '@angular/core';
import { ViewResource } from '../../../resource/view-resource';
import { ExpandCollapseItemsService } from '../../move-items/expand-collapse-items.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'res-item-header',
    templateUrl: './resource-item-header.component.html',
    styleUrls: [ 
        './resource-item-header.component.scss'
    ]
})
export class ResourceItemHeaderComponent {
    @Input() resItem: ViewResource;
    @Input() position: number;

    expandItemSubscription: Subscription;
    expanded: boolean = false;

    constructor(private expandCollapseItemService: ExpandCollapseItemsService) {}

    ngOnInit() {
        this.expandItemSubscription = this.expandCollapseItemService.expandItem$.subscribe((expandedItem) => {
            if(expandedItem.position === this.position) {
                this.expanded = expandedItem.expand;
            }
        })
    }

    expandCollapseItem() {
        this.expandCollapseItemService.expandItem({position: this.position, expand: !this.expanded});
    }

    ngOnDestroy() {
        this.expandItemSubscription.unsubscribe();
    }
}
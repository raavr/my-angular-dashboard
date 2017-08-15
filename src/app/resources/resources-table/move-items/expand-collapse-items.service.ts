import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

interface ExpandedItem {
    position: number;
    expand: boolean;
}

@Injectable()
export class ExpandCollapseItemsService {
  
  private expandItemSource = new Subject<ExpandedItem>();

  expandItem$ = this.expandItemSource.asObservable();

  expandItem(expandedItem: ExpandedItem): void {
      this.expandItemSource.next(expandedItem);
  }

}

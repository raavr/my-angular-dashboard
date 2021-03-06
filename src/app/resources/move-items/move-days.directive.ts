import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MoveDaysFrameService } from './move-days.service';
import { MOVE_DIR, DAY_ELEM_SIZE } from './move-days';
import { Subject } from 'rxjs/Subject';

@Directive({
  selector: '[moveDays]'
})
export class MoveDaysDirective {

  @Input() daysCount: number;
  currentPosition: number = 0;
  unsub$ = new Subject<any>();

  constructor(private el: ElementRef, private moveDaysService: MoveDaysFrameService) { }

  ngOnInit() {
    this.setMovingFrameWidth();
    this.moveDaysService.moveDays$
      .takeUntil(this.unsub$)
      .subscribe(
        (moveValue) => this.move(moveValue)
      );
  }

  private setMovingFrameWidth(): void {
    const movingFrameWidth = this.daysCount * DAY_ELEM_SIZE - this.daysCount;
    this.el.nativeElement.children[0].style.width = `${movingFrameWidth}px`;
  }

  private updatePosition(moveDir: MOVE_DIR): void {
    const offsetRight = this.el.nativeElement.getBoundingClientRect().right;
    const offsetChildRight = this.el.nativeElement.children[0].getBoundingClientRect().right;

    switch (moveDir) {
      case MOVE_DIR.RIGHT:
        if (offsetChildRight > offsetRight) {
          this.currentPosition++;
        }
        break;
      case MOVE_DIR.LEFT:
        if (this.currentPosition > 0) {
          this.currentPosition--;
        }
        break;
    }
  }

  private move(moveDir: MOVE_DIR): void {
    this.updatePosition(moveDir);

    const moveValue = -DAY_ELEM_SIZE * this.currentPosition + this.currentPosition;
    this.el.nativeElement.children[0].style.transform = `translateX(${moveValue}px)`;
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
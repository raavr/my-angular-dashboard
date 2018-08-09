import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'res-subitem',
  templateUrl: './resource-subitem.component.html',
  styleUrls: [
    './resource-subitem.component.scss'
  ]
})
export class ResourceSubitemComponent {
  @Input() workingHours: number;
  @Input() maxHours: number;
  @Output() assignHours = new EventEmitter<number>();

  private changeHoursSubject: Subject<string> = new Subject<string>();
  private unsub$ = new Subject<any>();

  isMenuOpen: boolean = false;
  currentWorkingHours: number = 0;

  openOverlay(): void {
    this.isMenuOpen = true;
    this.currentWorkingHours = this.workingHours;
  }

  assign(): void {
    this.isMenuOpen = false;
    this.assignHours.emit(this.currentWorkingHours);
  }

  changeValue(value: string): void {
    this.changeHoursSubject.next(value);
  }

  ngOnInit() {
    this.changeHoursSubject
      .debounceTime(200)
      .distinctUntilChanged()
      .filter(model => +model > this.maxHours || +model < 0)
      .takeUntil(this.unsub$)
      .subscribe(_ => this.currentWorkingHours = this.workingHours);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}

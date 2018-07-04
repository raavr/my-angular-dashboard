import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MOVE_DIR } from './move-days';

@Injectable()
export class MoveDaysFrameService {

  private moveDaysSource = new Subject<MOVE_DIR>();

  moveDays$ = this.moveDaysSource.asObservable();

  move(moveDir: MOVE_DIR): void {
    this.moveDaysSource.next(moveDir);
  }

}

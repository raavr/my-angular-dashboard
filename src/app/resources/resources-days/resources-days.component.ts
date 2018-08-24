import { Component, Input } from '@angular/core';

@Component({
  selector: 'res-days',
  templateUrl: './resources-days.component.html',
  styleUrls: [
    './resources-days.component.scss'
  ]
})
export class ResourcesDaysComponent {
  @Input() days: Date[];
}
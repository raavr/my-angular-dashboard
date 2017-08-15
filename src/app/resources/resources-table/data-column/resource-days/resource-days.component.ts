import { Component, Input } from '@angular/core';

@Component({
    selector: 'res-days',
    templateUrl: './resource-days.component.html',
    styleUrls: [ 
        './resource-days.component.scss'
    ]
})
export class ResourceDaysComponent {
    @Input() days: Date[];
}
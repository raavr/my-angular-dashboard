import { Component } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: '/navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    
    isActive: boolean = false;

    toggleNavbar(): void {
        this.isActive = !this.isActive;
    }
}
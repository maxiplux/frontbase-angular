import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../auth/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(private authService: AuthService, private router: Router) {

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}

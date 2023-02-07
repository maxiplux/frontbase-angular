import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../AuthService";
import {Router} from "@angular/router";
import {UserCredentials} from "../../models/user";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form:FormGroup;
  user: UserCredentials;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.user= {username: '', password: ''};

  }

  ngOnInit(): void {

      if (this.authService.isAuthenticated())
      {

        this.router.navigateByUrl(`/dashboard`);
      }

  }


  submit() {

    this.authService.login(this.user.username, this.user.password).subscribe(response => {

        this.authService.saveUser(response.access_token);
        this.authService.saveToken(response.access_token);
        Swal.fire(    'Login!',        `Hola ${this.user.username}, has iniciado sesión con éxito!`, 'success');
      this.router.navigateByUrl(`/dashboard`);
      }, err => {
        if (err.status in [400, 401,403]) {
          Swal.fire(    'Error Login!',        `Usuario o clave incorrectas!`, 'error');
        }
      }
    );


  }
}

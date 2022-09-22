import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operationType = ''
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  usuario = {
    email: '',
    password: ''
  }

  Ingresar() {
    const { email, password } = this.usuario;
    this.authService.login(email, password).then(res => {
      console.log("Ingreso :", res);
      if (res?.operationType == 'signIn') {
        this.router.navigate(['/home']);
      }
    }).catch(err => {
      console.log(err)
    })

  }

  Registrar() {
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.authService.register(email, password).then(res => {
      if (res?.operationType == 'signIn') {
        this.router.navigate(['/home']);
      }
      console.log("Se registro :", res)
    })
  }


  ingresarConGoogle() {
    const { email, password } = this.usuario;
    this.authService.loginWithGoogle(email, password).then(res => {
      this.router.navigate(['/home']);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  formularioLogin: FormGroup;
  

  ngOnInit(){
    this.formularioLogin = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required)
    })
  }

  iniciarSesion() {
    //falta hacer peticion en el servicio de lo siguiente, que contiene un objeto con los datos del formulario
    let formContent = this.formularioLogin.value;
    console.log(this.formularioLogin.value)
  }
}

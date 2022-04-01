 import { Component, OnInit } from '@angular/core';
 import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
 import {SignUp} from "../model/sign-up";
 import {FormLoginService} from "../service/form-login.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  status = 'Please fill in the form register';
  form: any = {};
  signUpForm!: SignUp;
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  error1: any = {
    message: "nouser"
  }
  error2: any = {
    message: "noemail"
  }
  success: any = {
    message: "yes"
  }
  checkSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private formLoginService:FormLoginService) { }

  ngOnInit(): void {

  }

  ngSubmit(){
    this.signUpForm = new SignUp(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    )
    this.formLoginService.signUp(this.signUpForm).subscribe(data =>{
      console.log('data = ', data);
      if(JSON.stringify(data)==JSON.stringify(this.error1)){
        this.status = 'The username is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'The email is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Create User account success!'
        this.checkSuccess = true;
      }
    })
  }

}

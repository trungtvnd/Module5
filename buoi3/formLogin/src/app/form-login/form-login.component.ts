import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  public formLogin = this.formBuilder.group({
    username : [''],
    password : ['']
  })

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

}

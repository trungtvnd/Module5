import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

export function forbidden(c: AbstractControl): ValidationErrors | null {
  const v = c.value;
  return (v.password === v.rePassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {

  public formData = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rePassword: ['', Validators.required],
    country: ['', Validators.required],
    age: ['', [Validators.min(18), Validators.required, Validators.pattern("^[0-9]{2}")]],
    gender: ['', Validators.required],
    phone: ['', [Validators.pattern("^[0-9\\+]{9,11}$"), Validators.required]],
  }, {validator: this.checkIfMatchingPasswords('password', 'rePassword')})

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  public onSubmit() {
    console.log(this.formData.value)
  }

  public checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }
}

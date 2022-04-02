import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SignUp} from "../model/sign-up";
import {Observable} from "rxjs";
import {SignInForm} from "../model/sign-in-form";
import {JwtResponse} from "../model/JwtResponse";

const apiAuth = environment.apiAuth;
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_Key';
@Injectable({
  providedIn: 'root'
})
export class FormLoginService {
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };


  constructor(private httpClient: HttpClient) {

  }

  signUp(signUp: SignUp): Observable<any>{
    return this.httpClient.post<any>(apiAuth + '/signup', signUp, this.httpOption);
  }
  signIn(signIn: SignInForm): Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(apiAuth + 'signin',signIn)
  }

  loggined() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const username = sessionStorage.getItem(NAME_KEY);
    const authority = sessionStorage.getItem(ROLE_KEY);
    if (username && token && authority) {
      return true;
    }
    return false;
  }

}

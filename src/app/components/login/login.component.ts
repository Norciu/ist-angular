import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import {Snacks} from '../../helpers/snacks';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snacks: Snacks,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  getIn(val: {username: string, password: string}): void {
    this.loginForm.valid ?  this.loginService.loginUser(val.username, val.password) : this.snacks.dangerInfo('Uzupełnij dane logowania!');
  }

}

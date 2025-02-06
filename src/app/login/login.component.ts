import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Login} from "../model/login.model";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginFormGroup! : UntypedFormGroup;
  constructor(private fb : UntypedFormBuilder, private customerService:CustomerService, private router:Router) { }

  ngOnInit(): void {
    this.loginFormGroup=this.fb.group({
      username : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      password : this.fb.control(null,[Validators.required, Validators.email])
    });
  }

  handleSaveCustomer() {
    
  }
}

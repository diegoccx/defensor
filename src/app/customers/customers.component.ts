import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers! : Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup : UntypedFormGroup | undefined;
  constructor(private customerService : CustomerService, private fb : UntypedFormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchCustomers();
  }
  handleSearchCustomers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Você confirma a exclusão do Cliente?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next : (resp) => {
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        );
      },
      error : err => {
        console.log(err);
      }
    })
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state :customer});
  }
}

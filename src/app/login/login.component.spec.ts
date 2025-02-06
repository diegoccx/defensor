import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCustomerComponent } from './new-customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewCustomerComponent', () => {
  let component: NewCustomerComponent;
  let fixture: ComponentFixture<NewCustomerComponent>;
  let customerService: CustomerService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [NewCustomerComponent],
      providers: [
        CustomerService,
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerComponent);
    component = fixture.componentInstance;
    customerService = TestBed.inject(CustomerService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar um formulário com os campos nome e email', () => {
    expect(component.newCustomerFormGroup.contains('name')).toBeTruthy();
    expect(component.newCustomerFormGroup.contains('email')).toBeTruthy();
  });

  it('deve marcar o campo nome como inválido quando estiver vazio', () => {
    let nameControl = component.newCustomerFormGroup.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalsy();
  });

  it('deve marcar o campo email como inválido quando estiver vazio ou inválido', () => {
    let emailControl = component.newCustomerFormGroup.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();

    emailControl?.setValue('email-invalido');
    expect(emailControl?.valid).toBeFalsy();
  });

it('deve chamar customerService.saveCustomer() quando o formulário for válido e enviado', () => {
  const customerToSave = { name: 'John Doe', email: 'john@example.com' }; // Removido o 'id'

  // Espiar a chamada do serviço
  spyOn(customerService, 'saveCustomer').and.returnValue(of(customerToSave));

  // Simula o preenchimento do formulário
  component.newCustomerFormGroup.setValue(customerToSave);

  component.handleSaveCustomer();

  // Verifica se o serviço foi chamado corretamente
  expect(customerService.saveCustomer).toHaveBeenCalledWith(customerToSave);
  expect(router.navigateByUrl).toHaveBeenCalledWith('/customers');
});



  it('deve exibir mensagem de erro quando saveCustomer falhar', () => {
    const errorResponse = { error: { message: 'Erro ao salvar o cliente' } };
    spyOn(customerService, 'saveCustomer').and.returnValue(throwError(errorResponse));

    const consoleSpy = spyOn(console, 'log');

    const customer = { name: 'John Doe', email: 'john@example.com' };
    component.newCustomerFormGroup.setValue(customer);
    component.handleSaveCustomer();

    expect(consoleSpy).toHaveBeenCalledWith(errorResponse);
  });

});

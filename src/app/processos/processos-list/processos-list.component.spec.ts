import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosListComponent } from './processos-list.component';

describe('ProcessosListComponent', () => {
  let component: ProcessosListComponent;
  let fixture: ComponentFixture<ProcessosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

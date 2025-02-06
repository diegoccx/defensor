import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensorFormComponent } from './defensor-form.component';

describe('DefensorFormComponent', () => {
  let component: DefensorFormComponent;
  let fixture: ComponentFixture<DefensorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefensorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefensorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

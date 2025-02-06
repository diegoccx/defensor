import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensoresListComponent } from './defensores-list.component';

describe('DefensoresListComponent', () => {
  let component: DefensoresListComponent;
  let fixture: ComponentFixture<DefensoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefensoresListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefensoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

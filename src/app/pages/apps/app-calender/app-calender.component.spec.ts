import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCalenderComponent } from './app-calender.component';

describe('AppCalenderComponent', () => {
  let component: AppCalenderComponent;
  let fixture: ComponentFixture<AppCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCalenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

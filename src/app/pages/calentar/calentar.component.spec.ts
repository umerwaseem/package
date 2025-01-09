import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalentarComponent } from './calentar.component';

describe('CalentarComponent', () => {
  let component: CalentarComponent;
  let fixture: ComponentFixture<CalentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalentarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

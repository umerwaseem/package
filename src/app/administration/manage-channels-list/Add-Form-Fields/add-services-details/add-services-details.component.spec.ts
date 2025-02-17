import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServicesDetailsComponent } from './add-services-details.component';

describe('AddServicesDetailsComponent', () => {
  let component: AddServicesDetailsComponent;
  let fixture: ComponentFixture<AddServicesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddServicesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServicesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

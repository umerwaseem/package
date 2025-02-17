import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomFieldDetailsComponent } from './add-custom-field-details.component';

describe('AddCustomFieldDetailsComponent', () => {
  let component: AddCustomFieldDetailsComponent;
  let fixture: ComponentFixture<AddCustomFieldDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomFieldDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomFieldDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

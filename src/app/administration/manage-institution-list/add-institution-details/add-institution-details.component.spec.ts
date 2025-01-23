import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitutionDetailsComponent } from './add-institution-details.component';

describe('AddInstitutionDetailsComponent', () => {
  let component: AddInstitutionDetailsComponent;
  let fixture: ComponentFixture<AddInstitutionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInstitutionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInstitutionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

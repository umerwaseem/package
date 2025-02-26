import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFieldMappingDetailsComponent } from './add-field-mapping-details.component';

describe('AddFieldMappingDetailsComponent', () => {
  let component: AddFieldMappingDetailsComponent;
  let fixture: ComponentFixture<AddFieldMappingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFieldMappingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFieldMappingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

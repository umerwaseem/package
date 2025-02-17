import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFieldDefinitionComponent } from './add-field-definition.component';

describe('AddFieldDefinitionComponent', () => {
  let component: AddFieldDefinitionComponent;
  let fixture: ComponentFixture<AddFieldDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFieldDefinitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFieldDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

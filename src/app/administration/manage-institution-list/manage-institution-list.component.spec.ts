import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInstitutionListComponent } from './manage-institution-list.component';

describe('ManageInstitutionListComponent', () => {
  let component: ManageInstitutionListComponent;
  let fixture: ComponentFixture<ManageInstitutionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInstitutionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInstitutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

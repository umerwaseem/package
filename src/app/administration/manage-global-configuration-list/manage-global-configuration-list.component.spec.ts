import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGlobalConfigurationListComponent } from './manage-global-configuration-list.component';

describe('ManageGlobalConfigurationListComponent', () => {
  let component: ManageGlobalConfigurationListComponent;
  let fixture: ComponentFixture<ManageGlobalConfigurationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageGlobalConfigurationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGlobalConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

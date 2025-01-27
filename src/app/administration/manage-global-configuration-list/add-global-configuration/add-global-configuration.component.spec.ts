import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGlobalConfigurationComponent } from './add-global-configuration.component';

describe('AddGlobalConfigurationComponent', () => {
  let component: AddGlobalConfigurationComponent;
  let fixture: ComponentFixture<AddGlobalConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGlobalConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGlobalConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

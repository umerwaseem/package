import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMappingChannelsDetailsComponent } from './manage-mapping-channels-details.component';

describe('ManageMappingChannelsDetailsComponent', () => {
  let component: ManageMappingChannelsDetailsComponent;
  let fixture: ComponentFixture<ManageMappingChannelsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMappingChannelsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMappingChannelsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

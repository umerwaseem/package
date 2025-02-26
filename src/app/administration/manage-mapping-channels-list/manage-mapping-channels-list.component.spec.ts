import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMappingChannelsListComponent } from './manage-mapping-channels-list.component';

describe('ManageMappingChannelsListComponent', () => {
  let component: ManageMappingChannelsListComponent;
  let fixture: ComponentFixture<ManageMappingChannelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMappingChannelsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMappingChannelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

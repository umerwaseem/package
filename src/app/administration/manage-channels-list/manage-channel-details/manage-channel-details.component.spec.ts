import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChannelDetailsComponent } from './manage-channel-details.component';

describe('ManageChannelDetailsComponent', () => {
  let component: ManageChannelDetailsComponent;
  let fixture: ComponentFixture<ManageChannelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageChannelDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageChannelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

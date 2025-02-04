import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChannelsListComponent } from './manage-channels-list.component';

describe('ManageChannelsListComponent', () => {
  let component: ManageChannelsListComponent;
  let fixture: ComponentFixture<ManageChannelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageChannelsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageChannelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

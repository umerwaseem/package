import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChannelDetailsComponent } from './add-channel-details.component';

describe('AddChannelDetailsComponent', () => {
  let component: AddChannelDetailsComponent;
  let fixture: ComponentFixture<AddChannelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChannelDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChannelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

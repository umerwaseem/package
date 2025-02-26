import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMessageRoutingDetailsComponent } from './add-message-routing-details.component';

describe('AddMessageRoutingDetailsComponent', () => {
  let component: AddMessageRoutingDetailsComponent;
  let fixture: ComponentFixture<AddMessageRoutingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMessageRoutingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMessageRoutingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

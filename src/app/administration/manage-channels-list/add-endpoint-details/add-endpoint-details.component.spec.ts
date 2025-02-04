import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEndpointDetailsComponent } from './add-endpoint-details.component';

describe('AddEndpointDetailsComponent', () => {
  let component: AddEndpointDetailsComponent;
  let fixture: ComponentFixture<AddEndpointDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEndpointDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEndpointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

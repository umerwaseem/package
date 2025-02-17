import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQueuesDetailsComponent } from './add-queues-details.component';

describe('AddQueuesDetailsComponent', () => {
  let component: AddQueuesDetailsComponent;
  let fixture: ComponentFixture<AddQueuesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQueuesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQueuesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

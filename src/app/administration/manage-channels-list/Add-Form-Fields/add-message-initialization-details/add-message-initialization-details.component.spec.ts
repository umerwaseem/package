import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMessageInitializationDetailsComponent } from './add-message-initialization-details.component';

describe('AddMessageInitializationDetailsComponent', () => {
  let component: AddMessageInitializationDetailsComponent;
  let fixture: ComponentFixture<AddMessageInitializationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMessageInitializationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMessageInitializationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

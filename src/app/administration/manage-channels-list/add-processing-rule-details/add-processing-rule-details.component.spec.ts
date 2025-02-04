import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcessingRuleDetailsComponent } from './add-processing-rule-details.component';

describe('AddProcessingRuleDetailsComponent', () => {
  let component: AddProcessingRuleDetailsComponent;
  let fixture: ComponentFixture<AddProcessingRuleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProcessingRuleDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProcessingRuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

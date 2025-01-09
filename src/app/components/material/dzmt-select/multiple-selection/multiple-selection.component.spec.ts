import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectionComponent } from './multiple-selection.component';

describe('MultipleSelectionComponent', () => {
  let component: MultipleSelectionComponent;
  let fixture: ComponentFixture<MultipleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

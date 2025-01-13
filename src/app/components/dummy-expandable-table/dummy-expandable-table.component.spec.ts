import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyExpandableTableComponent } from './dummy-expandable-table.component';

describe('DummyExpandableTableComponent', () => {
  let component: DummyExpandableTableComponent;
  let fixture: ComponentFixture<DummyExpandableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyExpandableTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyExpandableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

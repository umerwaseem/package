import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyTableComponent } from './dummy-table.component';

describe('DummyTableComponent', () => {
  let component: DummyTableComponent;
  let fixture: ComponentFixture<DummyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

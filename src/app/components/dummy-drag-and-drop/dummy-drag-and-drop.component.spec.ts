import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyDragAndDropComponent } from './dummy-drag-and-drop.component';

describe('DummyDragAndDropComponent', () => {
  let component: DummyDragAndDropComponent;
  let fixture: ComponentFixture<DummyDragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyDragAndDropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

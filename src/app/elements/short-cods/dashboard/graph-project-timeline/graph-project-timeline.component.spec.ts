import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphProjectTimelineComponent } from './graph-project-timeline.component';

describe('GraphProjectTimelineComponent', () => {
  let component: GraphProjectTimelineComponent;
  let fixture: ComponentFixture<GraphProjectTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphProjectTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphProjectTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphProjectReleasedComponent } from './graph-project-released.component';

describe('GraphProjectReleasedComponent', () => {
  let component: GraphProjectReleasedComponent;
  let fixture: ComponentFixture<GraphProjectReleasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphProjectReleasedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphProjectReleasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

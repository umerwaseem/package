import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphClientComponent } from './graph-client.component';

describe('GraphClientComponent', () => {
  let component: GraphClientComponent;
  let fixture: ComponentFixture<GraphClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

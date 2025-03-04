import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewMessageRoutingComponent } from './preview-message-routing.component';

describe('PreviewMessageRoutingComponent', () => {
  let component: PreviewMessageRoutingComponent;
  let fixture: ComponentFixture<PreviewMessageRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewMessageRoutingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewMessageRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

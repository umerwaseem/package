import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEndpointDetailsDialogComponent } from './view-endpoint-details-dialog.component';

describe('ViewEndpointDetailsDialogComponent', () => {
  let component: ViewEndpointDetailsDialogComponent;
  let fixture: ComponentFixture<ViewEndpointDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEndpointDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEndpointDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

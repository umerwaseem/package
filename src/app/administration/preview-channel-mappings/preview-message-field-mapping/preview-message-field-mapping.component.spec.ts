import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewMessageFieldMappingComponent } from './preview-message-field-mapping.component';

describe('PreviewMessageFieldMappingComponent', () => {
  let component: PreviewMessageFieldMappingComponent;
  let fixture: ComponentFixture<PreviewMessageFieldMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewMessageFieldMappingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewMessageFieldMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

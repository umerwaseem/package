import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewChannelMappingsComponent } from './preview-channel-mappings.component';

describe('PreviewChannelMappingsComponent', () => {
  let component: PreviewChannelMappingsComponent;
  let fixture: ComponentFixture<PreviewChannelMappingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewChannelMappingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewChannelMappingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

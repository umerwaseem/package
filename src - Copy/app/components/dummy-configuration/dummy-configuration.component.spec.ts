import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyConfigurationComponent } from './dummy-configuration.component';

describe('DummyConfigurationComponent', () => {
  let component: DummyConfigurationComponent;
  let fixture: ComponentFixture<DummyConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

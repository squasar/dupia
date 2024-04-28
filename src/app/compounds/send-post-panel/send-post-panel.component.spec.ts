import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPostPanelComponent } from './send-post-panel.component';

describe('SendPostPanelComponent', () => {
  let component: SendPostPanelComponent;
  let fixture: ComponentFixture<SendPostPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendPostPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendPostPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

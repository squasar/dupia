import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivePostPanelComponent } from './receive-post-panel.component';

describe('ReceivePostPanelComponent', () => {
  let component: ReceivePostPanelComponent;
  let fixture: ComponentFixture<ReceivePostPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivePostPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivePostPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InMessagingComponent } from './in-messaging.component';

describe('InMessagingComponent', () => {
  let component: InMessagingComponent;
  let fixture: ComponentFixture<InMessagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InMessagingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

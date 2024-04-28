import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InMessagingListComponent } from './in-messaging-list.component';

describe('InMessagingListComponent', () => {
  let component: InMessagingListComponent;
  let fixture: ComponentFixture<InMessagingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InMessagingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InMessagingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

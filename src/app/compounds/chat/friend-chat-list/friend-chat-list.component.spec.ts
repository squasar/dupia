import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendChatListComponent } from './friend-chat-list.component';

describe('FriendChatListComponent', () => {
  let component: FriendChatListComponent;
  let fixture: ComponentFixture<FriendChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendChatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

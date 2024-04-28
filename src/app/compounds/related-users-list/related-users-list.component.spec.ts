import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedUsersListComponent } from './related-users-list.component';

describe('RelatedUsersListComponent', () => {
  let component: RelatedUsersListComponent;
  let fixture: ComponentFixture<RelatedUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedUsersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

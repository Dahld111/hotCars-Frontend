import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReser } from './user-reser';

describe('UserReser', () => {
  let component: UserReser;
  let fixture: ComponentFixture<UserReser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

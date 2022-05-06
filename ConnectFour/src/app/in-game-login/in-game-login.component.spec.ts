import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InGameLoginComponent } from './in-game-login.component';

describe('InGameLoginComponent', () => {
  let component: InGameLoginComponent;
  let fixture: ComponentFixture<InGameLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InGameLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InGameLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

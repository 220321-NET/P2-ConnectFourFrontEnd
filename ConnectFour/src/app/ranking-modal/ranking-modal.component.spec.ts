import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingModalComponent } from './ranking-modal.component';

describe('RankingModalComponent', () => {
  let component: RankingModalComponent;
  let fixture: ComponentFixture<RankingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

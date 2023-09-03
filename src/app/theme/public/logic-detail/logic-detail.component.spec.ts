import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicDetailComponent } from './logic-detail.component';

describe('LogicDetailComponent', () => {
  let component: LogicDetailComponent;
  let fixture: ComponentFixture<LogicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogicDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

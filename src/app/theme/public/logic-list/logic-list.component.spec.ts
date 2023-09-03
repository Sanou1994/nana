import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicListComponent } from './logic-list.component';

describe('LogicListComponent', () => {
  let component: LogicListComponent;
  let fixture: ComponentFixture<LogicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogicListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

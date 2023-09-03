import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtiliteLogicielComponent } from './butTelechargement.component';

describe('UtiliteLogicielComponent', () => {
  let component: UtiliteLogicielComponent;
  let fixture: ComponentFixture<UtiliteLogicielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtiliteLogicielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtiliteLogicielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalogicielComponent } from './modalogiciel.component';

describe('ModalogicielComponent', () => {
  let component: ModalogicielComponent;
  let fixture: ComponentFixture<ModalogicielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalogicielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalogicielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

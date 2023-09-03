import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieLogComponent } from './categorie-log.component';

describe('CategorieLogComponent', () => {
  let component: CategorieLogComponent;
  let fixture: ComponentFixture<CategorieLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

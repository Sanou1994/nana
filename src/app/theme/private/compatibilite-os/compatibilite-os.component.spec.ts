import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatibiliteOsComponent } from './compatibilite-os.component';

describe('CompatibiliteOsComponent', () => {
  let component: CompatibiliteOsComponent;
  let fixture: ComponentFixture<CompatibiliteOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompatibiliteOsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompatibiliteOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

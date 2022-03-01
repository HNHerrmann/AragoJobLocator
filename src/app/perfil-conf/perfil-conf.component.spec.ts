import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilConfComponent } from './perfil-conf.component';

describe('PerfilConfComponent', () => {
  let component: PerfilConfComponent;
  let fixture: ComponentFixture<PerfilConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

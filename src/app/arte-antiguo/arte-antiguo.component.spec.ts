import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArteAntiguoComponent } from './arte-antiguo.component';

describe('ArteAntiguoComponent', () => {
  let component: ArteAntiguoComponent;
  let fixture: ComponentFixture<ArteAntiguoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArteAntiguoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArteAntiguoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

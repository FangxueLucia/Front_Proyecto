import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldMastersComponent } from './old-masters.component';

describe('OldMastersComponent', () => {
  let component: OldMastersComponent;
  let fixture: ComponentFixture<OldMastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldMastersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldMastersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

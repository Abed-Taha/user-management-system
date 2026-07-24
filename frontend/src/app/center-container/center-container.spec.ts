import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterContainer } from './center-container';

describe('CenterContainer', () => {
  let component: CenterContainer;
  let fixture: ComponentFixture<CenterContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(CenterContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

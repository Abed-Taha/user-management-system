import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllBar } from './controll-bar';

describe('ControllBar', () => {
  let component: ControllBar;
  let fixture: ComponentFixture<ControllBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControllBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

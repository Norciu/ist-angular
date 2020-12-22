import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetsTableComponent } from './streets-table.component';

describe('StreetsTableComponent', () => {
  let component: StreetsTableComponent;
  let fixture: ComponentFixture<StreetsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreetsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferOptionComponent } from './defer-option.component';

describe('DeferOptionComponent', () => {
  let component: DeferOptionComponent;
  let fixture: ComponentFixture<DeferOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeferOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

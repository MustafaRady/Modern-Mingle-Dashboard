import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth2GuardComponent } from './auth2-guard.component';

describe('Auth2GuardComponent', () => {
  let component: Auth2GuardComponent;
  let fixture: ComponentFixture<Auth2GuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Auth2GuardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Auth2GuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

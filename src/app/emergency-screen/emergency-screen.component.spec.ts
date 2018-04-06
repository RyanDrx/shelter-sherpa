import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyScreenComponent } from './emergency-screen.component';

describe('EmergencyScreenComponent', () => {
  let component: EmergencyScreenComponent;
  let fixture: ComponentFixture<EmergencyScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

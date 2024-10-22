import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordPropertiesComponent } from './landlord-properties.component';

describe('LandlordPropertiesComponent', () => {
  let component: LandlordPropertiesComponent;
  let fixture: ComponentFixture<LandlordPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandlordPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandlordPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePropertiesComponent } from './active-properties.component';

describe('ActivePropertiesComponent', () => {
  let component: ActivePropertiesComponent;
  let fixture: ComponentFixture<ActivePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivePropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

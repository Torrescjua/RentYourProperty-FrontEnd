import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestCreateComponent } from './request-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RequestCreateComponent', () => {
  let component: RequestCreateComponent;
  let fixture: ComponentFixture<RequestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestCreateComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

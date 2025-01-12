import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontHeaderComponent } from './front-header.component';

describe('FrontHeaderComponent', () => {
  let component: FrontHeaderComponent;
  let fixture: ComponentFixture<FrontHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

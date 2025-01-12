import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontFooterComponent } from './front-footer.component';

describe('FrontFooterComponent', () => {
  let component: FrontFooterComponent;
  let fixture: ComponentFixture<FrontFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontSidebarComponent } from './front-sidebar.component';

describe('FrontSidebarComponent', () => {
  let component: FrontSidebarComponent;
  let fixture: ComponentFixture<FrontSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

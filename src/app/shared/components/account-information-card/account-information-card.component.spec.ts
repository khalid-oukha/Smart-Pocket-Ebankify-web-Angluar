import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInformationCardComponent } from './account-information-card.component';

describe('AccountInformationCardComponent', () => {
  let component: AccountInformationCardComponent;
  let fixture: ComponentFixture<AccountInformationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountInformationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountInformationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankaccountsComponent } from './bankaccounts.component';

describe('BankaccountsComponent', () => {
  let component: BankaccountsComponent;
  let fixture: ComponentFixture<BankaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankaccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

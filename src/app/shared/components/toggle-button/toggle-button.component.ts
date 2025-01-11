import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ToggleButtonModule} from "primeng/togglebutton";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [
    FormsModule,
    ToggleButtonModule,
    NgClass
  ],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.css'
})
export class ToggleButtonComponent {
  @Input() initialStatus: string = 'INACTIVE';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;

  @Output() statusChange = new EventEmitter<boolean>(); // Emit toggle state change

  onToggleChange(event: any): void {
    this.statusChange.emit(event.checked); // Emit the new toggle state
  }
}

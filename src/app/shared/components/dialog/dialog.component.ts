import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { AvatarModule } from "primeng/avatar";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DialogField} from "../../../models/DialogField";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    FormsModule
  ],
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Input() visible = false;
  @Input() header = '';
  @Input() entityName = '';
  @Input() avatarUrl = 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';
  @Input() fields: DialogField[] = [];

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<DialogField[]>();
  @Output() cancel = new EventEmitter<void>();

  onCancel(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.cancel.emit();
  }

  onSave(): void {
    this.save.emit(this.fields);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}

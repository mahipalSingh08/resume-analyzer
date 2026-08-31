import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})
export class JobDescriptionComponent {
  @Input() jdText: string = '';
  @Output() jdTextChange = new EventEmitter<string>();

  onTextChange(newVal: string) {
    this.jdText = newVal;
    this.jdTextChange.emit(this.jdText);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  note = {
    title: '',
    content: '',
  };

  title = new FormControl('', [Validators.required, Validators.minLength(5)]);
  content = new FormControl('', [Validators.required, Validators.minLength(7)]);

  notes: { title: string; content: string }[] = [];

  selectedNoteIndex: number | null = null;

  saveNote() {
    if (this.title.valid && this.content.valid) {
      this.notes.push({
        title: this.title.value!,
        content: this.content.value!,
      });
      this.title.reset();
      this.content.reset();
    }
  }

  selectNote(index: number) {
    this.selectedNoteIndex = index;
    this.note = { ...this.notes[index] };
  }

  editNote() {
    if (this.selectedNoteIndex !== null) {
      this.notes[this.selectedNoteIndex] = { ...this.note };
      this.note = { title: '', content: '' };
      this.selectedNoteIndex = null;
    }
  }

  deleteNote() {
    if (this.selectedNoteIndex !== null) {
      this.notes.splice(this.selectedNoteIndex, 1);
      this.note = { title: '', content: '' };
      this.selectedNoteIndex = null;
    }
  }
}

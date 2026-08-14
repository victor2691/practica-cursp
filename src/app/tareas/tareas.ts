import { Component, Input } from '@angular/core';
import { required } from '@angular/forms/signals';

@Component({
  selector: 'app-tareas',
  imports: [],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class Tareas {
@Input({required: true}) nombreParaTarea!: string;
}

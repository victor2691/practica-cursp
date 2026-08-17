import { Component, Input } from '@angular/core';
import { Tarea } from '../tarea/tarea';

@Component({
  selector: 'app-tareas',
  imports: [Tarea],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class Tareas {
  @Input({ required: true }) nombreParaTarea!: string;
}

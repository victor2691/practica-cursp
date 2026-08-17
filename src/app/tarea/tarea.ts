import { Component, Input } from '@angular/core';

interface TareasList {
  id: string
  idUsuario: string
  titulo: string
  resumen: string
  expira: string
}

@Component({
  selector: 'app-tarea',
  imports: [],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css',
})
export class Tarea {
  @Input({ required: true }) tarea!: TareasList
}

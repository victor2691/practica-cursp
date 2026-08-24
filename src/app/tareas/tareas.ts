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
  @Input({ required: true }) IdUsuario!: string;

  tareasFalses = [
    {
      id: 't1',
      idUsuario: 'u1',
      titulo: 'Dominar Angular',
      resumen: 'Apreder todas las características básicas y avanzasAngular cómo apicarlas.',
      expira: '2025-01-01'
    },
    {
      id: 't2',
      idUsuario: 'u3',
      titulo: 'Crear el primer prototipo',
      resumen: 'Crear el primer prototipo del sitio web de la tienda',
      expira: '2025-11-05',
    },
    {
      id: 't3',
      idUsuario: 'u3',
      titulo: 'Preparar la plantilla del carrito',
      resumen: 'Preparar y describir una plantilla de carrito de compras de la tienda online',
      expira: '2025-05-16',
    },
  ]

  get tareasUsuarioSeleccionado() {
    return this.tareasFalses.filter((tarea) => tarea.idUsuario === this.IdUsuario);
    /*EL FILTER RETORNA UN ARREGLO CON EL RESULTADO*/

  }
}

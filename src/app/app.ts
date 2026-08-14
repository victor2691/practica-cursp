import { Component, signal } from '@angular/core';
import { Encabezado } from "./encabezado/encabezado";
import { Usuario } from "./usuario/usuario";
import { USUARIOS_FALSOS } from './usuario/usuarios-falsos';
import { Tareas } from './tareas/tareas';


@Component({
  selector: 'app-root',
  imports: [Encabezado, Usuario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  usuarios = USUARIOS_FALSOS;
  nombreUsuario?: Usuario;

  alSeleccionarUsuario(id: string) {
    console.log('Usuario seleccionado con el id ' + id);

    this.nombreUsuario = USUARIOS_FALSOS.find((usuario: Usuario) => usuario.id === id);
  }

  EnviarNombre(nonbre: string) {

  }
}

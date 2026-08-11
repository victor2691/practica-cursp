import { Component, signal } from '@angular/core';
import { Encabezado } from "./encabezado/encabezado";
import { Usuario } from "./usuario/usuario";

@Component({
  selector: 'app-root',
  imports: [Encabezado, Usuario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

import { Component } from '@angular/core';
import { Howl } from 'howler';
import { SoundService } from '../sound.service';

@Component({
  selector: 'app-foto-graciosa',
  templateUrl: './foto-graciosa.component.html',
  styleUrls: ['./foto-graciosa.component.scss']
})
export class FotoGraciosaComponent {

// Por ejemplo, crea instancias de Howl para los sonidos de acierto y error
aciertoSound: Howl;
errorSound: Howl;
imagenActual: number = 0;

constructor(private soundService:SoundService) {
  this.aciertoSound = new Howl({ src: ['assets/acierto.mp3'] });
  this.errorSound = new Howl({ src: ['assets/error.mp3'] });
}

preguntas: {
  respuestas: number[];
  fotos: string[];
}[] = [
  {
    respuestas: [4, 3, 5, 4, 1],
    fotos: ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg']
  },
  // Otras preguntas...
];

preguntaActual: {
  respuestas: number[];
  fotos: string[];
} = {
  respuestas: [],
  fotos: []
};

respuestaSeleccionada: string = ''; // Agregamos el inicializador aquí


ngOnInit() {
  const preguntaIndex = Math.floor(Math.random() * this.preguntas.length);
  this.preguntaActual = this.preguntas[preguntaIndex];
  this.soundService.playBackground('quiz');
}

// esRespuestaCorrecta(): boolean {
  // return this.respuestaSeleccionada === this.preguntaActual.respuesta;
// }

mostrarRespuesta: boolean = false;

enviarRespuesta(): void {
  this.aciertoSound.play();
  if (this.respuestaSeleccionada !== '') {
    this.mostrarRespuesta = true;
  }
}

 

  // ... Código existente ...

  mostrarSiguienteImagen(): void {
    this.imagenActual = (this.imagenActual + 1) % this.preguntaActual.fotos.length;
  }

  mostrarAnteriorImagen(): void {
    this.imagenActual = (this.imagenActual - 1 + this.preguntaActual.fotos.length) % this.preguntaActual.fotos.length;
  }

}

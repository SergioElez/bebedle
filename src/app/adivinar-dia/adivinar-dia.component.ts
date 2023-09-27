import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { SoundService } from '../sound.service';

@Component({
  selector: 'app-adivinar-dia',
  templateUrl: './adivinar-dia.component.html',
  styleUrls: ['./adivinar-dia.component.scss']
})
export class AdivinarDiaComponent implements OnInit {

// Por ejemplo, crea instancias de Howl para los sonidos de acierto y error
  aciertoSound: Howl;
  errorSound: Howl;
  imagenActual: number = 0;

  constructor(private soundService:SoundService) {
    this.aciertoSound = new Howl({ src: ['assets/acierto.mp3'] });
    this.errorSound = new Howl({ src: ['assets/error.mp3'] });
  }

  preguntas: {
    respuesta: string;
    opciones: string[];
    fotos: string[];
  }[] = [
    {
      respuesta: 'Viaje a Roma',
      opciones: ['Viaje a Roma', 'Viaje a Francia', 'Casa', 'Boda'],
      fotos: ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg']
    },
    // Otras preguntas...
  ];

  preguntaActual: {
    respuesta: string;
    opciones: string[];
    fotos: string[];
  } = {
    respuesta: '',
    opciones: [],
    fotos: []
  };

  respuestaSeleccionada: string = ''; // Agregamos el inicializador aquí


  ngOnInit() {
    const preguntaIndex = Math.floor(Math.random() * this.preguntas.length);
    this.preguntaActual = this.preguntas[preguntaIndex];
    this.soundService.playBackground('quiz');
  }
  
  esRespuestaCorrecta(): boolean {
    return this.respuestaSeleccionada === this.preguntaActual.respuesta;
  }
  
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

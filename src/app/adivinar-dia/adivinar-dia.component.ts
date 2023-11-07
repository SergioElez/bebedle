import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { SoundService } from '../sound.service';
import { ToastrService } from 'ngx-toastr';
import { BdService } from '../bd.service';

@Component({
  selector: 'app-adivinar-dia',
  templateUrl: './adivinar-dia.component.html',
  styleUrls: ['./adivinar-dia.component.scss']
})
export class AdivinarDiaComponent implements OnInit {

// Por ejemplo, crea instancias de Howl para los sonidos de acierto y error
  cantBuy: Howl;
  bip: Howl;
  aciertoSound: Howl;
  errorSound: Howl;
  imagenActual: number = 0;

  constructor(private soundService:SoundService, private toast: ToastrService,  
    private bdService: BdService) {
    this.cantBuy = new Howl({ src: ['assets/cantBuy.wav'] });
    this.bip = new Howl({ src: ['assets/bip.wav'] });
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
    // {
      // respuesta: 'Viaje a Francia',
      // opciones: ['pito', 'Viaje a Francia', 'Casa', 'Boda'],
      // fotos: ['foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg']
    // },
    // Otras preguntas...
  ];

  preguntaIndex: number = 0;
  
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
  pistasCompradas: number = 0; 


  ngOnInit() {
    this.preguntaIndex = Math.floor(Math.random() * this.preguntas.length);
    this.preguntaActual = this.preguntas[this.preguntaIndex];
    this.soundService.playBackground('quiz');
  }
  
  comprarPista(){
  //TODO hacer que gaste dinero
    if (this.pistasCompradas < this.preguntaActual.fotos.length - 1) {
      this.bip.play();
      this.pistasCompradas++;
      this.imagenActual = (this.pistasCompradas) ;
    } else{
      this.cantBuy.play();
    }
  }
  
  esRespuestaCorrecta(): boolean {
    return this.respuestaSeleccionada === this.preguntaActual.respuesta;
  }
  
  mostrarRespuesta: boolean = false;

  enviarRespuesta(): void {
  
    this.pistasCompradas = this.preguntaActual.fotos.length;
    
    this.aciertoSound.play();
    if (this.respuestaSeleccionada !== '') {
      this.mostrarRespuesta = true;
    }
    
    if(this.respuestaSeleccionada === this.preguntaActual.respuesta){
      this.sumarPuntos(20)
    }
  }
  
  sumarPuntos(puntosSumados: number){
      this.bdService.incrementarPuntos(puntosSumados);
      this.toast.success('Has ganado '+puntosSumados+' puntos!', 'Enhorabuena bebita');
  }
  
  
    // ... Código existente ...
  
    mostrarSiguienteImagen(): void {
      this.bip.play();
    
      if (this.pistasCompradas === 0) {
        this.imagenActual = (this.imagenActual + 1) % 1;
      } else if (this.pistasCompradas === 1) {
        this.imagenActual = (this.imagenActual + 1) % 2;
      } else if (this.pistasCompradas === 2) {
        this.imagenActual = (this.imagenActual + 1) % 3;
      } else {
        this.imagenActual = (this.imagenActual + 1) % 4;
      }
      // this.imagenActual = (this.imagenActual + 1) % this.preguntaActual.fotos.length;
    }
  
    mostrarAnteriorImagen(): void {
      this.bip.play();
    
      if (this.pistasCompradas === 0) {
        this.imagenActual = (this.imagenActual - 1 + 1) % 1;
      } else if (this.pistasCompradas === 1) {
        this.imagenActual = (this.imagenActual - 1 + 2) % 2;
      } else if (this.pistasCompradas === 2) {
        this.imagenActual = (this.imagenActual - 1 + 3) % 3;
      } else {
      
        this.imagenActual = (this.imagenActual - 1 + 4) % 4;
        // this.imagenActual = (this.imagenActual - 1 + this.preguntaActual.fotos.length) % this.preguntaActual.fotos.length;
      }
      
      // this.imagenActual = (this.imagenActual - 1 + this.preguntaActual.fotos.length) % this.preguntaActual.fotos.length;
    }
  
  
}

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
    pregunta: string;
    respuesta: number;
    opciones: string[];
    fotos: number;
  }[] = [
    {
      pregunta: '¿Qué hicimos este dia?',
      opciones: [
        'Ir al Suitopia', 
        'Comer en el Antica Roma', 
        'Ir al morro de Toix', 
        'Todas son correctas'
      ],
      respuesta: 4,
      fotos: 4
    },
    {
      pregunta: '¿Qué fue lo que hicimos en la feria?',
      opciones: [
        'Patinar', 
        'Dar un paseo', 
        'Tirar dardos en un puesto', 
        'Comprar una patata asada'
      ],
      respuesta: 3,
      fotos: 4
    },
    {
      pregunta: '¿Cual fue el regalo del bebito por navidad?',
      opciones: [
        'Una pulsera y una polla', 
        'Un charm, un bikini y el unicorns', 
        'Una carta, un bikini, un charm y el unicorns', 
        'Una polla, una funda, una pulsera y el unicorns', 
      ],
      respuesta: 4,
      fotos: 4
    },
    {
      pregunta: '¿Dónde estan hechas estas fotos?',
      opciones: [
        'En un parque', 
        'En las salinas', 
        'En el campo', 
        'En benidorm'
      ],
      respuesta: 4,
      fotos: 2
    },
    {
      pregunta: '¿Qué fue lo que te compraron y no te comiste en la tia Pa?',
      opciones: [
        'Pizza', 
        'Pepino', 
        'Aceitunas', 
        'Cocas'
      ],
      respuesta: 2,
      fotos: 4
    },
    {
      pregunta: '¿Qué fue lo que hicimos este dia?',
      opciones: [
        'Ir de tiendas por calpe', 
        'Comer al vips', 
        'Hacernos una sesion de fotos en el HM', 
        'Comer en el KFC'
      ],
      respuesta: 3,
      fotos: 4
    },
    {
      pregunta: '¿Como se llama este gato?',
      opciones: [
        'Algodón', 
        'Aguacate',
        'Raspi', 
        'Melocotón'
      ],
      respuesta: 4,
      fotos: 3
    },
    {
      pregunta: '¿Qué fue lo que hicimos este dia?',
      opciones: [
        'Ir a misa', 
        'Ir a al museo', 
        'Hacernos una sesion de fotos', 
        'Todas son correctas'
      ],
      respuesta: 1,
      fotos: 3
    },
    {
      pregunta: '¿Qué celebramos este dia?',
      opciones: [
        'San Valentín', 
        'El medio año', 
        'El año', 
        'El cumple de la bebita'
      ],
      respuesta: 2,
      fotos: 4
    },
    {
      pregunta: '¿Qué hicimos este dia?',
      opciones: [
        'Ir al corro', 
        'Ir al museo', 
        'Conocer a tu primo Sandro', 
        'Todas son correctas'
      ],
      respuesta: 4,
      fotos: 4
    },
    {
      pregunta: '¿En lugar se hicieron estas fotos?',
      opciones: [
        'En burgos',
        'En calpe', 
        'En murcia', 
        'En benidorm', 
      ],
      respuesta: 1,
      fotos: 4
    },
    {
      pregunta: '¿En lugar se hicieron estas fotos?',
      opciones: [
        'En Fresneña',
        'En Belorado', 
        'En Calpe', 
        'En Benidorm', 
      ],
      respuesta: 1,
      fotos: 4
    },
    {
      pregunta: '¿En lugar se hicieron estas fotos?',
      opciones: [
        'En Fresneña',
        'En Belorado', 
        'En Calpe', 
        'En Benidorm', 
      ],
      respuesta: 2,
      fotos: 4
    },
    {
      pregunta: '¿Qué fue lo que vimos este dia?',
      opciones: [
        'Un niño tropezarse',
        'Gente escalando', 
        'Una pelea de gaviotas', 
        'Gente haciendo surf', 
      ],
      respuesta: 2,
      fotos: 3
    },
    {
      pregunta: '¿Qué personas fueron a esta comida?',
      opciones: [
        'El bebito, la bebita y la mami',
        'El bebito, la bebita, la mami y el papi',
        'El bebito, la bebita y el papi',
        'El bebito, la bebita, la mami, el papi y mi tia',
      ],
      respuesta: 1,
      fotos: 2
    },
    {
      pregunta: '¿A donde fuimos a este dia?',
      opciones: [
        'Al Suitopia',
        'De fiesta',
        'Al circo',
        'A cenar al padrino',
      ],
      respuesta: 3,
      fotos: 3
    },
    {
      pregunta: '¿Qué comimos este dia?',
      opciones: [
        'Hamburguesa',
        'Comida china',
        'Pasta y pizza',
        'Ensalada y escalope',
      ],
      respuesta: 2,
      fotos: 3
    },
    {
      pregunta: '¿Qué comimos este dia?',
      opciones: [
        'A la playa',
        'A la piscina',
        'Al Aqualandia',
        'Al parque cerca del colegio',
      ],
      respuesta: 3,
      fotos: 4
    },
    {
      pregunta: '¿En que lugar se han hecho estas fotos?',
      opciones: [
        'Madrid',
        'Alicante',
        'Burgos',
        'Murcia',
      ],
      respuesta: 1,
      fotos: 4
    },
    {
      pregunta: '¿Por donde salimos de fiesta este dia?',
      opciones: [
        'Benidorm',
        'Calpe',
        'Denia',
        'Ninguna es correcta',
      ],
      respuesta: 3,
      fotos: 3
    },
    {
      pregunta: '¿En que lugar se han hecho estas fotos?',
      opciones: [
        'Madrid',
        'Alicante',
        'Burgos',
        'Murcia',
      ],
      respuesta: 4,
      fotos: 4
    },
    {
      pregunta: '¿En que lugar se han hecho estas fotos?',
      opciones: [
        'Madrid',
        'Alicante',
        'Burgos',
        'Murcia',
      ],
      respuesta: 1,
      fotos: 4
    },
    {
      pregunta: '¿Cuales de estas comidas comimos aqui?',
      opciones: [
        'Brownie',
        'Tarta chocolate',
        'Tarta de oreo',
        'Pastel casero',
      ],
      respuesta: 1,
      fotos: 4
    },
  ];

  preguntaIndex: number = 0;
  
  preguntaActual: {
    pregunta: string;
    respuesta: number;
    opciones: string[];
    fotos: number;
  } = {
    pregunta: '',
    respuesta: 0,
    opciones: [],
    fotos: 0
  };

  respuestaSeleccionada: string = ''; // Agregamos el inicializador aquí
  pistasCompradas: number = 0; 
  contPalabras: number = 0;
  
  getStoredWordDate(): string | null {
    return localStorage.getItem('currentWordDate');
  }
  storeWordDate(date: string): void {
    localStorage.setItem('currentWordDate', date);
  }
  storedDate: any;
  
  ngOnInit() {
  
    this.storedDate = this.getStoredWordDate();
    
    
    if (this.storedDate !== new Date().toLocaleDateString()) {
      
      this.bdService.setMinijuegoCompletado('adivinar');
      this.storeWordDate(new Date().toLocaleDateString());
      
    }
    
    this.bdService.getMinijuegosCompletados("adivinar").then((minijuegosCompletados) => {
      this.contPalabras =  minijuegosCompletados as number;
      if (this.storedDate !== new Date().toLocaleDateString()) {
        this.contPalabras++;
      }
      this.preguntaIndex = this.contPalabras;
      this.preguntaActual = this.preguntas[this.preguntaIndex];
      console.log(this.preguntaIndex)
    })
    // this.preguntaIndex = Math.floor(Math.random() * this.preguntas.length);
    // this.preguntaIndex = this.preguntas.length - 1;
    
    
    this.soundService.playBackground('quiz');
    
  }
  
  comprarPista(){
  //TODO hacer que gaste dinero
    if (this.pistasCompradas < this.preguntaActual.fotos - 1) {
      this.bdService.decrementarPuntos(5);
      this.bip.play();
      this.pistasCompradas++;
      this.imagenActual = (this.pistasCompradas) ;
    } else{
      this.cantBuy.play();
    }
  }
  
  esRespuestaCorrecta(): boolean {
    return this.respuestaSeleccionada === this.preguntaActual.opciones[this.preguntaActual.respuesta - 1];
  }
  
  mostrarRespuesta: boolean = false;

  enviarRespuesta(): void {
    this.pistasCompradas = this.preguntaActual.fotos;
    
    if (this.respuestaSeleccionada !== '') {
      this.storeWordDate(new Date().toLocaleDateString());
      this.aciertoSound.play();
      this.mostrarRespuesta = true;
    } else {
      this.cantBuy.play();
    }
    
    if(this.esRespuestaCorrecta() && this.storedDate !== new Date().toLocaleDateString()) {
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
    
    preguntaAnterior(){
      if(this.preguntaIndex > 0){
        this.bip.play();
        this.preguntaIndex--;
        this.preguntaActual = this.preguntas[this.preguntaIndex];
      } else{
        this.cantBuy.play();
      }
    }
    
    preguntaSiguiente(){
      if(this.preguntaIndex < this.contPalabras){
        this.bip.play();
        this.preguntaIndex++;
        this.preguntaActual = this.preguntas[this.preguntaIndex];
        } else{
          this.cantBuy.play();
        }
    }
  
  
}

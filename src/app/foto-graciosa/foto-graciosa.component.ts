import { Component } from '@angular/core';
import { Howl } from 'howler';
import { SoundService } from '../sound.service';
import { ToastrService } from 'ngx-toastr';
import { BdService } from '../bd.service';

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

constructor(private soundService:SoundService, private toast: ToastrService,  
private bdService: BdService) {  this.aciertoSound = new Howl({ src: ['assets/acierto.mp3'] });
  this.errorSound = new Howl({ src: ['assets/error.mp3'] });
}

preguntas: {
  respuestas: number[];
  fotos: string[];
}[] = [
  {
    respuestas: [3, 5, 1, 4, 5, 5],
    fotos: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
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

respuestaSeleccionadas: number[] = [];


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
  // if (this.respuestaSeleccionada !== '') {
    this.mostrarRespuesta = true;
  // }
}

  clickEmoji(value: number): void {
    this.respuestaSeleccionadas[this.imagenActual] = value;
    this.respuestaSeleccionadas[this.imagenActual] = value;
    this.mostrarRespuesta = true;
    
    if(this.preguntaActual.respuestas[this.imagenActual] == value + 1 ||
      this.preguntaActual.respuestas[this.imagenActual] == value  ||
      this.preguntaActual.respuestas[this.imagenActual] == value +2
    ) {
      let puntos;
      if(this.preguntaActual.respuestas[this.imagenActual] == value + 1)
        puntos = 10;
        else
        puntos = 5;
        
        this.sumarPuntos(puntos);
    //TODO sumar puntos
      this.aciertoSound.play();
    } else {
      this.errorSound.play();
    }
  }
  
  sumarPuntos(puntosSumados: number){
    let data = localStorage.getItem('bdData');
    if (data !== null) {
      // Si data no es nulo, entonces puedes intentar analizarlo como JSON
      let jsonData = JSON.parse(data);
      
      // Modifica la cantidad de puntos según tus necesidades
      let nuevaCantidadDePuntos = puntosSumados + jsonData.puntos; // Cambia esto por la cantidad deseada
    
      // Actualiza la cantidad de puntos en el objeto jsonData
      jsonData.puntos = nuevaCantidadDePuntos;
      let newData = JSON.stringify(jsonData);

      // Actualiza los datos en el almacenamiento local
      localStorage.setItem('bdData', newData);
      this.bdService.incrementarPuntos(puntosSumados);
      this.toast.success('Has ganado '+puntosSumados+' puntos!', 'Enhorabuena bebita');
    } else {
      // Maneja el caso en el que 'bdData' no existe en el almacenamiento local
      console.error('La clave "bdData" no se encuentra en el almacenamiento local.');
    }
  }
 

  // ... Código existente ...

  mostrarSiguienteImagen(): void {
    this.imagenActual = (this.imagenActual + 1) % this.preguntaActual.fotos.length;
    if(this.respuestaSeleccionadas[this.imagenActual] != undefined) this.mostrarRespuesta = false;
  }

  mostrarAnteriorImagen(): void {
    this.imagenActual = (this.imagenActual - 1 + this.preguntaActual.fotos.length) % this.preguntaActual.fotos.length;
    if(this.respuestaSeleccionadas[this.imagenActual] != undefined) this.mostrarRespuesta = false;
    
  }

}

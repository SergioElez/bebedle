import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  muteMusic: boolean = false;
  aciertoSound: Howl;
  errorSound: Howl;
  quizSound: Howl;
  bip: Howl;
  cantBuy: Howl;
  shop: Howl;

  constructor() {
    this.aciertoSound = new Howl({
      src: ['assets/acierto.mp3'],  // Reemplaza con la ruta correcta del archivo de sonido de acierto
      volume: 0.5  // Ajusta el volumen según tus necesidades
    });

    this.errorSound = new Howl({
      src: ['assets/error.wav'],  // Reemplaza con la ruta correcta del archivo de sonido de error
      volume: 0.5  // Ajusta el volumen según tus necesidades
    });
    
    this.quizSound = new Howl({
      src: ['assets/quiz.wav'],
      volume: 0.5,
      loop: true
    });
    
    this.shop = new Howl({
      src: ['assets/shop.mp3'],
      volume: 0.3,
      loop: true
    });
    
    this.bip = new Howl({
      src: ['assets/bip.wav'],
      volume: 0.5
    });
    
    this.cantBuy = new Howl({
      src: ['assets/cantBuy.wav'],
      volume: 0.5
    });
  }
  
  toggleMuteMusic(isMuted:boolean, theme: string): void {
 
 console.log(isMuted)
    // if(isMuted){
      // this.shop.volume(0);
      // this.quizSound.volume(0);
    // } else{
      // console.log("on")
      // this.shop.volume(0.5);
      // this.quizSound.volume(0.5);
    // }
    
    if(!isMuted){
      this.playBackground(theme);
    } else{
 this.stopAll();
    
    }
}

  
  stopAll(){
    this.stopQuizSound();
    this.stopShop();
  }
  
  playBackground(theme: string){
    this.stopAll();
    if(theme === 'shop'){
      this.playShop();
    }
    if(theme === 'quiz'){
      this.playQuizSound();
    }
  }

  playAciertoSound(): void {
    this.aciertoSound.play();
  }

  playErrorSound(): void {
    this.errorSound.play();
  }
  
  stopQuizSound(): void {
    this.quizSound.stop();
  }
  
  playBip(): void {
    this.bip.play();
  }
  
  playCantBuy(): void {
    this.cantBuy.play();
  }
  
  stopShop(): void {
    this.shop.stop();
  }
  
  playQuizSound(): void {
    const muteMusic = localStorage.getItem('muteMusic') === 'true';
    if (!muteMusic) {
      this.quizSound.play();
    }
  }
  
  playShop(): void {
    const muteMusic = localStorage.getItem('muteMusic') === 'true';
    if (!muteMusic) {
       this.shop.play();
    }
  }
  
}

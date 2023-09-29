import { Component } from '@angular/core';
import { BdService } from './bd.service';
import { SoundService } from './sound.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private soundService: SoundService,
    private bdService: BdService,
  ){
  
  }
  isMuted!:boolean;
  title = 'bebedle';
  public puntos: number = 0;
  
  isMobileNavOpen: boolean = false;

  ngOnInit(): void {
    this.obtenerPuntos();
    const muteMusic = localStorage.getItem('muteMusic');
    this.isMuted = muteMusic === 'true';
    console.log(this.isMuted);
    
    this.bdService.puntos$.subscribe((puntos) => {
      this.puntos = puntos;
    });
  }

  obtenerPuntos(): void {
    this.bdService.getJsonData()
      .then((jsonData: any) => {
        this.puntos = jsonData.puntos;
      })
      .catch((error: any) => {
        console.error('Error al obtener los puntos:', error);
      });
  }

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
    this.soundService.playBip();
    
  }
  
  toggleMuteMusic(): void {
    this.soundService.playBip();
  
    // const muteMusic = localStorage.getItem('muteMusic');
    // this.isMuted = muteMusic === 'true';
    // this.soundService.stopAll();
    this.isMuted = !this.isMuted;
    const updatedMuteMusic = this.isMuted ? 'true' : 'false';
    localStorage.setItem('muteMusic', updatedMuteMusic);
    console.log(this.isMuted);
    console.log(updatedMuteMusic);
    
    this.soundService.toggleMuteMusic(this.isMuted, 'shop');
  }

}

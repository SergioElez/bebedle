import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BdService } from '../bd.service';
import { SoundService } from '../sound.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  public desbloqueables: any[] = [];
  public puntos: number = 0;

  constructor(private bdService: BdService,
  private soundService: SoundService,
  private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.soundService.playBackground('shop');
    this.obtenerDesbloqueables();
    this.obtenerPuntos();
    
  }

  obtenerDesbloqueables(): void {
    this.bdService.getJsonData()
      .then((jsonData: any) => {
        this.desbloqueables = jsonData.desbloqueables;
      })
      .catch((error: any) => {
        console.error('Error al obtener los desbloqueables:', error);
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

  comprarDesbloqueable(nombreDesbloqueable: string): void {
    this.bdService.comprarDesbloqueable(nombreDesbloqueable)
      .then(() => {
        console.log('Desbloqueable comprado exitosamente');
        this.obtenerPuntos();
        this.obtenerDesbloqueables();
        this.soundService.playAciertoSound();
      })
      .catch((error: any) => {
        console.error('Error al comprar el desbloqueable:', error);
        this.soundService.playCantBuy();
        this.toast.error('No tienes puntos suficientes!', 'Error al comprar' );
      });
  }
}

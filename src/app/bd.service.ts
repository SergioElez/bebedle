import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BdService {
  private storageKey = 'bdData';

  private getInitialData(): any {
    return {
      puntos: 0,
      desbloqueables: [
        { nombre: 'Minijuego 1', puntos: 12, comprado: false },
        { nombre: 'Minijuego 2', puntos: 12, comprado: false },
        { nombre: 'Minijuego 3', puntos: 12, comprado: false }
      ],
      minijuegosCompletados: {
        palabra: true,
        adivinarDia: false
      }
    };
  }

  private initializeDataIfNeeded(): void {
    const jsonData = localStorage.getItem(this.storageKey);
    if (!jsonData) {
      const initialData = this.getInitialData();
      localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    }
  }

  getJsonData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.initializeDataIfNeeded();
      const jsonData = localStorage.getItem(this.storageKey);
      
      if (jsonData) {
        resolve(JSON.parse(jsonData));
      } else {
        reject(new Error('No se encontraron datos en el almacenamiento local'));
      }
    });
  }

  writeJsonData(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        resolve();
      } catch (error) {
        reject(new Error('Error al escribir en el almacenamiento local'));
      }
    });
  }

  setPuntos(nuevosPuntos: number): Promise<void> {
    return this.getJsonData()
      .then(jsonData => {
        jsonData.puntos = nuevosPuntos;
        return this.writeJsonData(jsonData);
      })
      .catch(error => {
        console.error('Error al establecer los puntos:', error);
        throw error;
      });
  }

  comprarDesbloqueable(nombreDesbloqueable: string): Promise<void> {
    return this.getJsonData()
      .then(jsonData => {
        const desbloqueables = jsonData.desbloqueables;
        const desbloqueable = desbloqueables.find((d: any) => d.nombre === nombreDesbloqueable);

        console.log(jsonData);

        if (desbloqueable && desbloqueable.comprado === false && jsonData.puntos >= desbloqueable.puntos) {
          jsonData.puntos -= desbloqueable.puntos;
          desbloqueable.comprado = true;
          return this.writeJsonData(jsonData);
        } else {
          throw new Error('No se puede comprar el desbloqueable o no tienes suficientes puntos');
        }
      })
      .catch(error => {
        console.error('Error al comprar el desbloqueable:', error);
        throw error;
      });
  }
  
  incrementarPuntos(cantidad: number): Promise<void> {
    return this.getJsonData()
      .then(jsonData => {
        jsonData.puntos += cantidad;
        return this.writeJsonData(jsonData);
      })
      .catch(error => {
        console.error('Error al incrementar los puntos:', error);
        throw error;
      });
  }
  
  setMinijuegoCompletado(minijuego: string, completado: boolean): Promise<void> {
    return this.getJsonData()
      .then(jsonData => {
        const minijuegosCompletados = jsonData.minijuegosCompletados || {};
        minijuegosCompletados[minijuego] = completado;
        jsonData.minijuegosCompletados = minijuegosCompletados;
        return this.writeJsonData(jsonData);
      })
      .catch(error => {
        console.error('Error al establecer el estado de completado del minijuego:', error);
        throw error;
      });
  }
  
  
}

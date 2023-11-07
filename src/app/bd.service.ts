import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BdService {
  private storageKey = 'bdData';
  
  private puntosSubject = new BehaviorSubject<number>(0);

  // Observable para que los componentes puedan suscribirse a los cambios en los puntos
  puntos$: Observable<number> = this.puntosSubject.asObservable();

  private getInitialData(): any {
    return {
      puntos: 0,
      desbloqueables: [
        { nombre: '💬 Nueva categoria de palabras: ¿Que es mi bebé?', puntos: 10, comprado: false, cat: 'p' },
        { nombre: '📅 Nuevo minijuego: Adivina el dia', puntos: 30, comprado: false, cat: 'game' },
        { nombre: '💬 Nueva categoria de palabras: ¿Que es lo que más le gusta al bebito?', puntos: 50, comprado: false, cat: 'p' },
        { nombre: '📅 Nuevo minijuego: Foto más graciosa', puntos: 150, comprado: false, cat: 'game' },
        { nombre: '💬 Nueva categoria de palabras: ¿Que es lo que más le gusta a la bebita?', puntos: 50, comprado: false, cat: 'p' },
        { nombre: '📽 Video del desarrollo de Bebedle, pideselo al bebito', puntos: 500, comprado: false },
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

  // getJsonData(): Promise<any> {
    // return new Promise((resolve, reject) => {
      // this.initializeDataIfNeeded();
      // const jsonData = localStorage.getItem(this.storageKey);
      
      // if (jsonData) {
        // resolve(JSON.parse(jsonData));
      // } else {
        // reject(new Error('No se encontraron datos en el almacenamiento local'));
      // }
    // });
  // }
  
  getJsonData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.initializeDataIfNeeded();
      const jsonData = localStorage.getItem(this.storageKey);
  
      if (jsonData) {
        resolve(JSON.parse(jsonData));
      } else {
        reject(new Error('No se encontraron datos en el almacenamiento local'));
      }
    }).then(jsonData => {
      // Notificar cambios en los puntos
      this.puntosSubject.next(jsonData.puntos);
      return jsonData;
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
    let desbloqueable: any; // Declarar desbloqueable fuera de los bloques then
    
    return this.getJsonData()
      .then(jsonData => {
        const desbloqueables = jsonData.desbloqueables;
        desbloqueable = desbloqueables.find((d: any) => d.nombre === nombreDesbloqueable); // Asignar a desbloqueable aquí
  
        console.log(jsonData);
  
        if (desbloqueable && desbloqueable.comprado === false && jsonData.puntos >= desbloqueable.puntos) {
          jsonData.puntos -= desbloqueable.puntos;
          desbloqueable.comprado = true;
          return this.writeJsonData(jsonData);
        } else {
          throw new Error('No se puede comprar el desbloqueable o no tienes suficientes puntos');
        }
      })
      .then(() => {
        if (desbloqueable) { // Verificar si desbloqueable está definido
          // Notificar cambios en los puntos
          this.puntosSubject.next(this.puntosSubject.value - desbloqueable.puntos);
        }
      })
      .catch(error => {
        console.error('Error al comprar el desbloqueable:', error);
        throw error;
      });
  }
  
  
  
  // incrementarPuntos(cantidad: number): Promise<void> {
    // return this.getJsonData()
      // .then(jsonData => {
        // jsonData.puntos += cantidad;
        // return this.writeJsonData(jsonData);
      // })
      // .catch(error => {
        // console.error('Error al incrementar los puntos:', error);
        // throw error;
      // });
  // }
  
  // decrementarPuntos(cantidad: number): Promise<void> {
    // return this.getJsonData()
      // .then(jsonData => {
        // jsonData.puntos -= cantidad;
        // if(jsonData.puntos <= 0) jsonData.puntos = jsonData.puntos;
        // return this.writeJsonData(jsonData);
      // })
      // .catch(error => {
        // console.error('Error al incrementar los puntos:', error);
        // throw error;
      // });
  // }
  
  incrementarPuntos(cantidad: number): Promise<void> {
    return this.getJsonData()
      .then(jsonData => {
        jsonData.puntos += cantidad;
        console.log(jsonData)
        
        return this.writeJsonData(jsonData);
      })
      .then(() => {
        // Notificar cambios en los puntos
        this.puntosSubject.next(this.puntosSubject.value + cantidad);
      })
      .catch(error => {
        console.error('Error al incrementar los puntos:', error);
        throw error;
      });
  }
  
  decrementarPuntos(cantidad: number): Promise<void> {
    return this.getJsonData()
      .then(jsonData => {
        jsonData.puntos -= cantidad;
        if (jsonData.puntos <= 0) jsonData.puntos = 0;
        return this.writeJsonData(jsonData);
      })
      .then(() => {
        // Notificar cambios en los puntos
        this.puntosSubject.next(Math.max(0, this.puntosSubject.value - cantidad));
      })
      .catch(error => {
        console.error('Error al decrementar los puntos:', error);
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

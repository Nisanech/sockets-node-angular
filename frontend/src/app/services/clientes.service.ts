import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private socket: Socket) {
    this.socket = new Socket({ url: 'http://localhost:5000' });
  }

  public getClientes(): Observable<any> {
    return new Observable(observer => {
      try {
        this.socket.on('connect', () => {
          console.log('Conectado!');
        });

        this.socket.on('listarClientes', (data: any) => {
          console.log('Llego la data! :)', data);
          observer.next(data);
        });

        this.socket.on('disconnect', () => {
          observer.complete();
        });

        this.socket.on('error', (e: any) => {
          observer.error(e);
        });

        this.socket.on('connect_error', (e: any) => {
          observer.error(e);
        });

      } catch (e) {
        observer.error(e);
      }
    });
  }
}

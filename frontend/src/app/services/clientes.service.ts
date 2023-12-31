import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private socket: Socket) {
    this.socket = new Socket({ url: 'https://pruebasocket-dot-backend-cebar.uc.r.appspot.com/' });
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

  public crearCliente(clienteData: any): Observable<any> {
    return new Observable(observer => {
      try {
        this.socket.emit('crearCliente', clienteData); // Emitir el evento 'crearCliente' al servidor

        this.socket.on('listarClientes', (data: any) => {
          console.log('Actualización de la lista de clientes:', data);
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

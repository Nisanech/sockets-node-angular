import { Component } from '@angular/core';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listClientes: any

  constructor(private clienteService: ClientesService) {}

  ngOnInit(): void {
    this.clienteService.getPrices$().subscribe((data) => {

      console.log(data);
      this.listClientes = data.data

    })
    // this.amounts = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }

}

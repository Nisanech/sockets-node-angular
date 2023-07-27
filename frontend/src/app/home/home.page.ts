import { Component } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  clientesForm: FormGroup

  listClientes: any

  constructor(private clienteService: ClientesService, private formBuilder: FormBuilder) {
    this.clientesForm = this.formBuilder.group({
      no_identificacion: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      experiencia_anios: ['', [Validators.required]],
      tipo_identificacion: ['', [Validators.required]],
      fuente: ['', [Validators.required]],
      cod_departamento_cliente: ['', [Validators.required]],
      cod_municipio_cliente: ['', [Validators.required]],
      cod_vereda_cliente: ['', [Validators.required]],
      cantidad_fincas: ['', [Validators.required]],
      etnia: ['', [Validators.required]],
      doc_usuario_asignado: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((data) => {

      console.log(data);
      this.listClientes = data
    })
  }

  crearCliente() {
    let nuevoCliente = {
      no_identificacion: this.clientesForm.get('no_identificacion')?.value,
      nombres: this.clientesForm.get('nombres')?.value,
      apellidos: this.clientesForm.get('apellidos')?.value,
      direccion: this.clientesForm.get('direccion')?.value,
      telefono: this.clientesForm.get('telefono')?.value,
      email: this.clientesForm.get('email')?.value,
      sexo: this.clientesForm.get('sexo')?.value,
      fecha_nacimiento: this.clientesForm.get('fecha_nacimiento')?.value,
      experiencia_anios: 2020,
      tipo_identificacion: 1,
      fuente: 2,
      cod_departamento_cliente: 76,
      cod_municipio_cliente: 76892,
      cod_vereda_cliente: 76892013,
      cantidad_fincas: 0,
      etnia: 6,
      doc_usuario_asignado: 123456,
    }

    console.log(nuevoCliente);

    this.clienteService.crearCliente(nuevoCliente).subscribe((data) => {
      console.log("Cliente creado: ", data);

    })

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PedidoService } from './../service/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  text: string = 'Mostrar Formulario';
  itemForm: FormGroup;

  show: any = false;
  pedidos: any[] = [];
  idPedido: any;
  displayedColumns: string[] = ['nombreCliente', 'direccionEntrega', 'pedido', 'fechaEntrega', 'actualizar', 'borrar'];

  constructor(private fb: FormBuilder, private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.iniciarFormulario();

    this.getPedido();
  }

  iniciarFormulario() {
    this.itemForm = this.fb.group({
      nombreCliente: [''],
      direccionEntrega: [''],
      pedido: [''],
      fechaEntrega: ['']
    });
  }

  getPedido() {
    this.pedidoService.getPedidos().subscribe((pedidos: any) => {
      this.pedidos = pedidos;
    });
  }

  actualizarPedido(pedido: any) {
    this.idPedido = pedido._id;
    this.itemForm.patchValue({
      nombreCliente: pedido.nombreCliente,
      direccionEntrega: pedido.direccionEntrega,
      pedido: pedido.pedido,
      fechaEntrega: pedido.fechaEntrega,
    });
  }

  borrarPedido(pedido: any) {
    this.idPedido = pedido._id;
    this.pedidoService.borrarPedido(this.idPedido).subscribe(result => console.log('Se borro a: ', pedido));
    this.getPedido();
  }

  submit() {
    if (this.idPedido) {
      this.pedidoService.actualizarPedido(this.idPedido, this.itemForm.value).subscribe((pedido) => {
        console.log('Pedido Actualizado: ', pedido);
      });
    } else {
      this.pedidoService.guardarPedido(this.itemForm.value).subscribe((pedido) => {
        console.log('Pedido Nueva: ', pedido);
      });
    }
    this.getPedido();
  }

  showForm() {
    this.show = !this.show;
    console.log(this.pedidos);
    if (this.show) {
      this.text = 'Ocultar Formulario';
    }
    else {
      this.text = 'Mostrar Formulario';
    }
  }

}

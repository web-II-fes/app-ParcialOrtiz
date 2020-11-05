import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PedidoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private pedidoUrl = 'http://localhost:3002/api/modules/pedidos/';

  constructor(private httpClient: HttpClient) {}

  getPedidos() {
    return this.httpClient.get(this.pedidoUrl + 'pedido');
  }

  guardarPedido(pedido: any) {
    return this.httpClient.post(
      this.pedidoUrl + 'pedido',
      JSON.stringify(pedido),
      this.httpOptions
    );
  }

  actualizarPedido(idPedido, pedido) {
    return this.httpClient.put(
      this.pedidoUrl + 'pedido/' + idPedido,
      JSON.stringify(pedido),
      this.httpOptions
    );
  }

  borrarPedido(idPedido) {
    return this.httpClient.delete(
      this.pedidoUrl + 'pedido/' + idPedido,
      this.httpOptions
    );
  }
}
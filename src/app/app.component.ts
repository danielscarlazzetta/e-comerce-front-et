import { Component } from '@angular/core';
import { ProductoServiceService } from './producto-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commerce-front';
  
  productos: any[] = [];
  carrito: any[] = [];

  constructor(private productService: ProductoServiceService) {}

  ngOnInit(): void {
    this.mostrarProductos();
  }

  mostrarProductos(){
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.productos = data; 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  agregarAlCarrito(productId: string) {
    const quantity = 1; 
    console.log('cacacacac')
    this.productService.addToCart(productId, quantity).subscribe(
      () => {
        // alert('Producto agregado al carrito');
        Swal.fire("Agregado Correctamente");
      },
      (error) => {
        console.error(error);
        alert('Error al agregar el producto al carrito');
      }
    );
  }

  obtenerContenidoCarrito2() {
    this.productService.getCartContents().subscribe(
      (data) => {
        this.carrito = data.cartItems;
      },
      (error) => {
        console.error(error);
        // Manejar el error en caso de que la solicitud falle
      }
    );
  }

  eliminarDelCarrito(productId: string) {
    this.productService.removeFromCart(productId).subscribe(
      () => {
        alert('Producto eliminado del carrito');
      },
      (error) => {
        console.error(error);
        alert('Error al eliminar el producto del carrito');
      }
    );
  }

  mostrarContenidoCarrito() {
    this.productService.getCartContents().subscribe(
      (data) => {
        const cartItems = data.cartItems;
        let content = '';

        if (cartItems && cartItems.length > 0) {
          // Construir el contenido del mensaje con los elementos del carrito
          cartItems.forEach((item : any) => {
            content += `Producto: ${item.productName}, Cantidad: ${item.quantity} `;
          });
          
        } else {
          content = 'El carrito está vacío';
        }

        Swal.fire({
          title: 'Contenido del Carrito',
          text: content,
          icon: 'info',
          confirmButtonText: 'Cerrar'
        });
      },
      (error) => {
        console.error(error);
        // Manejar el error en caso de que la solicitud falle
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener el contenido del carrito',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    );
  }


}

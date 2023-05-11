import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary mr-1',
      cancelButton: 'btn btn-light',
    },
    buttonsStyling: false,
  });

  confirmDialog({ title, text }: SweetAlertOptions<string, string>) {
    return this.swalWithBootstrapButtons.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      width: 600,
    });
  }
}

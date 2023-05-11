import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './core/services/users.services';
import { User } from './core/interface/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      genero: ['', Validators.required],
      telefono: [
        '',
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      console.error('Formulario invalido');
      return;
    }

    const user = this.form.value as User;

    this.usersService.create(user).subscribe((user: User) => {
      this._snackBar.open('User was created successfully', 'Created');
      this.form.reset();
    });
  }
}

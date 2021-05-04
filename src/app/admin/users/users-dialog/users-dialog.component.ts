import { UsersService } from '../../../services/users/users.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent {
  public usersForm: FormGroup;
  public error: any;
  public action: string;
  public users: any;

  constructor(
    public dialogRef: MatDialogRef<UsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private usersService: UsersService
  ) {
    dialogRef.disableClose = true;
    this.users = {
      ...data.users,
      document: data.users ? data.users.document : null
    };

    this.action = data.action;
    if (this.action === 'PERSIST') {
      this.initilizeForm(this.users);
    }
  }

  initilizeForm(users) {
    this.usersForm = this._formBuilder.group({
      id: new FormControl(users.id, []),
      name: new FormControl(users.name, [Validators.required]),
      email: new FormControl(users.email, [Validators.required]),
      password: new FormControl(users.password, [Validators.required]),
      role: new FormControl(users.role, [Validators.required]),
      addres: new FormControl(users.addres, [Validators.required]),
      city: new FormControl(users.city, [Validators.required]),
      uf: new FormControl(users.uf, [Validators.required]),
      document: new FormControl(
        { value: users.document, disabled: !!users.id },
        [Validators.required]
      )
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUser() {
    if (this.usersForm.invalid) {
      return;
    }

    this.usersService.userAddUpdate(this.usersForm.getRawValue()).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      err => {
        this.handleError(err);
      }
    );
  }

  private handleError(err: any) {
    const { error } = err;
    const path = this.usersForm.get(error.path);
    if (path) {
      path.setErrors({ error: true });
      this.error = {
        message: error.message,
        path: error.path
      };
    }
  }
}

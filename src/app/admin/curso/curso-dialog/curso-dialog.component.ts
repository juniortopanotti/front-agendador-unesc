import { CursoService } from './../../../services/curso/curso.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-curso-dialog',
  templateUrl: './curso-dialog.component.html',
  styleUrls: ['./curso-dialog.component.scss']
})
export class CursoDialogComponent {
  public cursoForm: FormGroup;
  public error: any;
  public action: string;
  public curso: any;

  constructor(
    public dialogRef: MatDialogRef<CursoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private cursoService: CursoService
  ) {
    dialogRef.disableClose = true;
    this.curso = { ...data.curso };

    this.action = data.action;
    if (this.action === 'PERSIST') {
      this.initilizeForm(this.curso);
    }
  }

  initilizeForm(curso) {
    this.cursoForm = this._formBuilder.group({
      id: new FormControl(curso.id, []),
      nome: new FormControl(curso.nome, [
        Validators.required,
        Validators.maxLength(100)
      ])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.cursoService.delete(this.curso.id).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );

    this.dialogRef.close(true);
  }

  addUser() {
    if (this.cursoForm.invalid) {
      return;
    }

    this.cursoService.cursoAddUpdate(this.cursoForm.getRawValue()).subscribe(
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
    const path = this.cursoForm.get(error.path);
    if (path) {
      path.setErrors({ error: true });
      this.error = {
        message: error.message,
        path: error.path
      };
    }
  }
}

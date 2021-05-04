import { HydrometersService } from '../../../services/hydrometers/hydrometers.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-hydrometers-dialog',
  templateUrl: './hydrometers-dialog.component.html',
  styleUrls: ['./hydrometers-dialog.component.scss']
})
export class HydrometersDialogComponent {
  public hydrometersForm: FormGroup;
  public error: any;
  public action: string;
  public hydrometers: any;

  constructor(
    public dialogRef: MatDialogRef<HydrometersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private hydrometersService: HydrometersService
  ) {
    dialogRef.disableClose = true;
    this.hydrometers = {
      ...data.hydrometers,
      document: data.hydrometers ? data.hydrometers.user.document : null
    };

    this.action = data.action;
    if (this.action === 'PERSIST') {
      this.initilizeForm(this.hydrometers);
    }
  }

  initilizeForm(hydrometers) {
    this.hydrometersForm = this._formBuilder.group({
      id: new FormControl(hydrometers.id, []),
      ccid: new FormControl(hydrometers.ccid, [Validators.required]),
      document: new FormControl(hydrometers.document, [Validators.required]),
      addres: new FormControl(hydrometers.addres, [Validators.required]),
      lat: new FormControl(hydrometers.lat, [Validators.required]),
      long: new FormControl(hydrometers.long, [Validators.required])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addHydrometer() {
    if (this.hydrometersForm.invalid) {
      return;
    }

    this.hydrometersService
      .hydrometerAddUpdate(this.hydrometersForm.getRawValue())
      .subscribe(
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
    const path = this.hydrometersForm.get(error.path);
    if (path) {
      path.setErrors({ error: true });
      this.error = {
        message: error.message,
        path: error.path
      };
    }
  }
}

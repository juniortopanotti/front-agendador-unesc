import { UsersService } from '../../services/users/users.service';
import { HydrometersService } from '../../services/hydrometers/hydrometers.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public firstStep: FormGroup;
  public secondStep: FormGroup;
  public thirdStep: FormGroup;
  public steps: FormGroup[];
  public step = 1;

  public error: any;
  public usuario: any;

  public cursos: any[];

  public mask = [
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
  public phonePatern = /^(\(\d\d\)) (\d\d\d\d\d)\-(\d\d\d\d)$/gm;

  constructor(
    private _formBuilder: FormBuilder,
    private cursoService: HydrometersService,
    private usuarioService: UsersService
  ) {
    this.firstStep = this._formBuilder.group({
      nome: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      dt_nascimento: new FormControl('', Validators.required),
      celular: new FormControl('', [
        Validators.required,
        Validators.pattern(this.phonePatern)
      ]),
      sexo: new FormControl('', [Validators.required, Validators.maxLength(1)])
    });

    this.secondStep = this._formBuilder.group({
      id_curso: new FormControl('', [Validators.required]),
      fase: new FormControl('', [Validators.required]),
      orientador: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      trabalho: new FormControl('', [
        Validators.required,
        Validators.maxLength(150)
      ])
    });
    this.thirdStep = this._formBuilder.group(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.maxLength(6)
        ]),
        passwordConfirm: new FormControl('', [
          Validators.required,
          Validators.maxLength(6)
        ])
      },
      { validator: this.checkPasswords }
    );

    this.steps = [this.firstStep, this.secondStep, this.thirdStep];

    this.cursoService.index(0, 20).subscribe(
      (data: any) => {
        this.cursos = data.rows;
      },
      err => {}
    );
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('passwordConfirm').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  nextStep() {
    console.log(
      this.steps[this.step - 1].invalid,
      this.steps[this.step - 1].getRawValue()
    );
    if (this.steps[this.step - 1].invalid) {
      return;
    }
    this.step += 1;
  }

  previousStep() {
    this.step -= 1;
  }

  createUser() {
    const formInvalid = this.steps.findIndex(step => {
      return step.invalid === true;
    });

    if (formInvalid >= 0) {
      console.log('formInvalid', formInvalid);
      return;
    }

    const newUser = {
      ...this.firstStep.getRawValue(),
      ...this.secondStep.getRawValue(),
      ...this.thirdStep.getRawValue()
    };

    newUser.celular = newUser.celular.replace(/[^0-9\.]+/g, '');

    this.usuarioService.store(newUser).subscribe(
      data => {
        this.usuario = data;
        this.step += 1;
      },
      err => {
        this.handleError(err);
      }
    );
  }

  private handleError(err: any) {
    const { error } = err;
    this.steps.forEach(step => {
      const path = step.get(error.path);
      if (path) {
        path.setErrors({ error: true });
        this.error = {
          message: error.message,
          path: error.path
        };
      }
    });
  }

  // setError(error) {
  //   this.steps.forEach(step => {
  //     let path = step.get(error.path);
  //     if (path) {
  //       path.setErrors({ error: true });
  //     }
  //   });
  // }
}

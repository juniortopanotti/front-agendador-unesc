import { AuthGuard } from './../core/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'cursos',
        loadChildren: () => import('./curso/curso.module').then(m => m.CursoModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'atividades',
        loadChildren: () => import('./atividade/atividade.module').then(m => m.AtividadeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'horarios',
        loadChildren: () => import('./horario/horario.module').then(m => m.HorarioModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'agendamentos',
        loadChildren: () => import('./agendamento/agendamento.module').then(m => m.AgendamentoModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

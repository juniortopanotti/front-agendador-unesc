import { HydrometersComponent } from './hydrometers/hydrometers.component';
import { HydrometersListComponent } from './hydrometers-list/hydrometers-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HydrometersListComponent
  },
  {
    path: ':hydrometer',
    component: HydrometersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HydrometersRoutingModule {}

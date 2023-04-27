import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListHistoryComponent } from './list-history/list-history.component';

const routes: Routes = [
  {path: '', component:ListHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }

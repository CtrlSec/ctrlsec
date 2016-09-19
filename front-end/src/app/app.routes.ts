import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CandyComponent } from './candy/candy.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/candy',
    pathMatch: 'full'
  },
  {
    path: 'candy',
    component: CandyComponent
  }
];

export const routing = RouterModule.forRoot(routes);
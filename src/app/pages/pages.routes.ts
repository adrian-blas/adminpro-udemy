import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';

// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

import { VideosProfileComponent } from './videos-profile/videos-profile.component';

const pagesRoutes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [ VerificaTokenGuard ],
      data: { titulo: 'Dashboard' }
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
    { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de tema' } },
    { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
    { path: 'videos-profile', component: VideosProfileComponent, data: { titulo: 'Videos del usuario' } },

    // Mantenimientos
    {
      path: 'usuarios',
      component: UsuariosComponent,
      canActivate: [ AdminGuard ],
      data: { titulo: 'Mantenimientos de usuarios'
      }
    },
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimientos de hospitales' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimientos de medicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar medico' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

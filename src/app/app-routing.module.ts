import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { TownComponent } from './town/town.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AppAdminComponent } from './admin/app-admin/app-admin.component';
import { authGuard } from './admin/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'discover', component: DiscoverComponent },
    { path: 'town/:id', component: TownComponent },
    {
        path: 'admin',
        component: AppAdminComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

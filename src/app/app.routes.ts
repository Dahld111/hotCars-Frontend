import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Results } from './pages/results/results';
import { Details } from './pages/details/details';
import { Reservation } from './pages/reservation/reservation';
import { Driver } from './pages/driver/driver';

export const routes: Routes = [
    {path: "register", component: Register},
    {path: "login", component: Login},
    {path: "home", component: Home},
    {path: "results", component: Results},
    {path: "details", component: Details},
    {path: "reservation", component: Reservation},
    {path: "driver", component: Driver}
];

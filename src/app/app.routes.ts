import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Results } from './pages/results/results';
import { Details } from './pages/details/details';
import { Reservation } from './pages/reservation/reservation';
import { Driver } from './pages/driver/driver';
import { UserReser } from './pages/user-reser/user-reser';
import { Admin } from './pages/admin/admin';
import { Ourmission } from './pages/ourmission/ourmission';
import { World } from './pages/world/world';
import { Why } from './pages/why/why';
import { Privacy } from './pages/privacy/privacy';
import { Conditions } from './pages/conditions/conditions';

export const routes: Routes = [
    {path: "register", component: Register},
    {path: "login", component: Login},
    {path: "home", component: Home},
    {path: "results", component: Results},
    {path: "details", component: Details},
    {path: "reservation", component: Reservation},
    {path: "driver", component: Driver},
    {path: "user-reser", component: UserReser},
    {path: "admin", component: Admin},
    {path: "our-mission", component: Ourmission},
    {path: "world", component: World},
    {path: "why", component: Why},
    {path: "privacy", component: Privacy},
    {path: "conditions", component: Conditions}
];
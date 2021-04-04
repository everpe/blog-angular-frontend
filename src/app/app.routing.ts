//importando dependencias
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//Importando componentes
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {ErrorComponent} from './components/error/error.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';


//Creando arreglo de rutas de url
const appRoutes:Routes  =[
    {path:'', component :InicioComponent},
    {path:'inicio', component :InicioComponent},
    {path:'login', component :LoginComponent},
    {path:'register', component :RegisterComponent},
    //Ruta para Cerrar Sesión
    {path:'logout/:sure', component :LoginComponent},
    {path:'settingUser', component :EditUserComponent},
    {path:'**', component :ErrorComponent},
    
];

//Exportando configuración
export const appRoutingProviders:any []= [];
export const routing:ModuleWithProviders= RouterModule.forRoot(appRoutes);
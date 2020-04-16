import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importando Rutas para nav 
import {routing,appRoutingProviders} from './app.routing';
//Importando form angular (interactua con el model User(angular)
import {FormsModule} from '@angular/forms';
//Imoirtando cliente para los servicios con el backend
import {HttpClientModule} from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InicioComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

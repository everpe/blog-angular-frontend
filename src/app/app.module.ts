import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//importando Rutas para nav 
import {routing,appRoutingProviders} from './app.routing';
//Importando form angular (interactua con el model User(angular)
import {FormsModule} from '@angular/forms';
//Imoirtando cliente para los servicios con el backend
import {HttpClientModule} from '@angular/common/http'; 

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from 'angular-file-uploader';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ErrorComponent } from './components/error/error.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InicioComponent,
    ErrorComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    routing,//para las rutas de los componentes
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

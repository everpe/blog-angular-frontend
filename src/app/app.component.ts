import { Component,OnInit,DoCheck } from '@angular/core';
//importamos el serviceUSer para obetner datos del usuario loguado que están en LocalStorage
import { UserService } from './services/user.service';
import{ficheroGlobal} from './services/ficheroGlobal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
                      // Instance interfaces para metodos cargar y refrescar
export class AppComponent implements OnInit, DoCheck {
  public title='blog-angular';
  public identity;
  public token;
  public url = ficheroGlobal.url;
  constructor(public _userService : UserService){
      //this.identity=_userService.getIdentity();
      // this.token=_userService.getIdentity();

    this.loadUser();
  }

  ngOnInit(){
    console.log('oninit app.ts');
  }
  // Actualiza constantemente las variables del loscal storage
  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}

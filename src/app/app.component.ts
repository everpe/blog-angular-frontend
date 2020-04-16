import { Component } from '@angular/core';
//importamos el serviceUSer para obetner datos del usuario loguado que están en LocalStorage
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent {
  public title = 'blog-angular';
  public identity;
  public token;
  constructor(_userService:UserService){
    this.identity=_userService.getIdentity();
  }

}

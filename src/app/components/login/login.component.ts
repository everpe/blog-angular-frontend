import { Component, OnInit } from '@angular/core';
//importando el modelo User
import{User} from '../../models/user';
//importando el servicio para user
import{UserService} from '../../services/user.service';
import { error } from 'protractor';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   //Cargando el service user
   providers:[UserService]
})
export class LoginComponent implements OnInit {

  public page_title:string;
  public user:User;

  public status:string;
  public token;
  public identity;

  constructor(private _userService:UserService) 
  { 
    this.page_title='Logueate';
    //inicializa el modelo que se rellena en el form login.html
    this.user=new User(1,'','','ROLE_USER','','','','');
  }
  //Metodo que se ejecuta al cargarse el CP.
  ngOnInit(): void 
  {
  }
  //Metodo que es llamado en el form y a su vez llama
  //al metodo login del UserService
  onSubmit(form){
    this._userService.login(this.user).subscribe(
      response=>{
        if(response.status != 'error'){
          //recibiendo el token
          this.status='success';
          this.token=response;
          //nueva petición para recibir el User identificado
          this._userService.login(this.user,true).subscribe(
            response=>{
              this.identity=response;
              //GUARDAR DATOS EN EL NAVEGADOR
              localStorage.setItem('token',this.token);
              localStorage.setItem('identity',JSON.stringify(this.identity));
              console.log(this.identity);
              console.log(this.token);
              form.reset();
            },
            error=>{
              this.status="error";  
              console.log(<any>error);
            }
          );
        }else{
          this.status="error"; 

        }

      },
      error=>{
        this.status="error";  
        console.log(<any>error)
      }
    );

  }









}

import { Component, OnInit } from '@angular/core';
import{User} from '../../models/user';
//importando el servicio para user
import{UserService} from '../../services/user.service';



@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

  //Cargando el service user
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  public page_title:string;
  public user:User;

  //variable para mostrar mensaje de error o exioto (alert)
  public status:string;


  constructor(private _userService:UserService)
  { 
    this.page_title='Registrate';
    this.user=new User(1,'','','ROLE_USER','','','','');
  }

  ngOnInit(): void {
    console.log('Componente de registro cargado');
    // console.log(this._userService.test());
  }

  // Metodo que se llama en el form de Registro al clickear el boton
  onSubmit(form){
    
    this._userService.register(this.user).subscribe(
      response=>{
        if(response.status=="success"){
          this.status=response.status;
          form.reset();
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

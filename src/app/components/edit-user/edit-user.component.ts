import { Component, OnInit } from '@angular/core';
//importando el modelo
import{User} from '../../models/user';
import{UserService} from '../../services/user.service';
import{ficheroGlobal} from '../../services/ficheroGlobal';
import { url } from 'inspector';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers:[UserService]
})


export class EditUserComponent implements OnInit {
  page_title:any;
  public user:User;
  public identity;
  public token;
  public status;
  public url=ficheroGlobal.url;
  //Opciones para el editor froala
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };;
//configuración fileuploader para Imagen up
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:ficheroGlobal.url+'user/upload/avatar',
      headers: {
      "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    attachPinText:'Subir Imagen de Perfil',
};


  constructor(private _userService:UserService) { 

    this.page_title=JSON.parse(localStorage.getItem('identity'));
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    //inicializa el user en blanco
    this.user=  this.user=new User(
        this.identity.sub,this.identity.name,
        this.identity.surname,this.identity.role,
        this.identity.email,'',
        this.identity.description,this.identity.image);
  }
  
  ngOnInit(): void {
  }

  onSubmit(form)
  {
    this.status='undefined';
    //cuando se presiona actualizar, obtiene el modelo lleno y lo envia al servicio 
    this._userService.update(this.token,this.user).subscribe( 
      response => {
        if(response && response.status){
          console.log(response);
          this.status='success';  
          if(response.changes.name){
            this.user.name=response.changes.name;
          }
          if(response.changes.surname){
            this.user.surname=response.changes.surname;
          }
          if(response.changes.email){
            this.user.email=response.changes.email;
          }
          if(response.changes.description){
            this.user.description=response.changes.description;
          }
          if(response.changes.image){
            this.user.image=response.changes.image;
          }

          this.identity=this.user;
          localStorage.setItem('identity',JSON.stringify(this.identity));
          
        }else{
        this.status='error';
      }
    },
    error=>{
      this.status='error';
      console.log(<any>error);
    }
    );    
  }
/**
 * Recoge la respuesta  de haber subido la imagen a disco y actualiza el modelo con la ruta de
 * esa imagen en disco
 * @param datos, la respuesta de haber subido la imagen.  
 * 
 */
  avatarUpload(datos){
    // Luego de haber guardado la imagen del user en disco
    console.log(JSON.parse(datos.response));
    let data=JSON.parse(datos.response);
    // se le añade al modelo la ruta de la imagen,para luego actualizarlo
    this.user.image=data.image;
  }
}

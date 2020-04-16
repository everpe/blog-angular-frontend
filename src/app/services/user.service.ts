// SERÁ EL SERVICIO QUE HACE PETICIONES AJAX AL BACKEND (SOBRE EL USER)
//inyeccion de dependencias
import { Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
//importando datos globales del fichero
import {ficheroGlobal} from './ficheroGlobal';
import { JsonPipe } from '@angular/common';

@Injectable()
export class UserService{

    public url:string;
    //datos que se almaceanron en LocalStorage desde el Login
    public indentity;
    public token;

    constructor( public _http: HttpClient)
    {   
        this.url=ficheroGlobal.url;
    }

    test(){
        return "Hola Desde Service User";
    }
    
    /**
     * Metodo para registrar un nuevo user
     * @param user el modelo usuario que se va a registrar lleno
     *          con los datos del form del component register
     * @returns Observable, respuesta del backend
     */
    register(user) : Observable<any> {
        
        let json = JSON.stringify(user);
        let params='json='+json;

        //se le indica que es un formulario html,porque el api recibe es Request en el controlador
        let headers=new HttpHeaders().set('Content-Type',
            'application/x-www-form-urlencoded');

        //Retorna la petición por Post con la url de register del api,los datos,y la cabecera
        return this._http.post(this.url+'api/register',params,{headers:headers});
    }


    /**
     * Metodo que hace la autenticación al Api y agrega getToken si llega por parametro.
     * @param user, el modelo usuario con los datos llenos desed el Form. 
     * @param getToken, se agrega al modelo User por si se necesita obtener el object User desde el api,
     * aparte del JWT que se recibe para mostrar ciertos datos del user
     */
    login(user,getToken=null):Observable<any>{
        if(getToken!=null){
            //le agrega el atributo getToken al objeto para que le llegue ese 
            //atributo por Request al controlador y le devuelva el token y el object user
            user.getToken='true';
        }
        let json = JSON.stringify(user);
        let params='json='+json;

        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

        // console.log(this._http.post(this.url+'api/login',params,{headers:headers}));
        return this._http.post(this.url+'api/login',params,{headers:headers});

    
    }
    /**
     *Obtiene el objeto User con valores que se ha guardado en localStorage dese Login 
     */
    getIdentity(){
        let identity=JSON.parse(localStorage.getItem('identity'));
        if(identity && identity!= "undefined"){
            this.indentity=identity;
        }else{
            this.indentity=null;
        }
        return this.indentity;
    }
   /**
     *Obtiene el token que se ha guardado en localStorage dese Login 
     */
    getToken(){
        let token=JSON.parse(localStorage.getItem('token'));
        if(token && token!= "undefined"){
            this.token=token;
        }else{
            this.token=null;
        }
        return this.token;
    }
}

import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

    list: List[] = [];
    

  constructor() {
    this.cargarStorege();
    
    // const list1 = new List('Recolectar piedras del infinito');
    // const list2 = new List('Heroes a desaparecer');
  
    // this.list.push(list1, list2);
    
   }

   crearLista ( titulo: string){
     const nuevaLista = new List(titulo);
     this.list.push(nuevaLista);
     this.guardarStorage();

     return nuevaLista.id;
   }

   editList(id: number){
    return this.list.find( listData => listData.id === id);
   }

   deleteList( list: List ){
    this.list = this.list.filter( listData => listData.id !== list.id);
    this.guardarStorage(); 
  }

   obtenerLista(id: string | number){
      id = Number(id);
      
      return this.list.find ( listaData => listaData.id === id);
      
   }  


  guardarStorage(){
    localStorage.setItem('data', JSON.stringify (this.list))
  }


  cargarStorege(){
    if (localStorage.getItem('data')) {
      this.list = JSON.parse(localStorage.getItem('data') );
    } else {
      this.list = [];
    }
   
  }
}

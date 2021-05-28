
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListItem } from '../models/list-item.model';
import { List } from '../models/list.model';
import { DeseosService } from '../services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  list: List;
  nombreItem = '';

  constructor(private deseosService: DeseosService ,
              private route: ActivatedRoute) {

        const listaId = this.route.snapshot.paramMap.get('listaId');
           
         this.list = deseosService.obtenerLista(listaId);
   }

  ngOnInit() {
  }
  agregarItem(){

  if (this.nombreItem.length === 0) {
    return;
  }

  const nuevoItem = new ListItem(this.nombreItem);
  this.list.items.push(nuevoItem);
  this.nombreItem = '';
  this.deseosService.guardarStorage();
  }

  cambioCheck(items: ListItem ){

    const pendientes = this.list.items
                      .filter( itemData => !itemData.completado)
                      .length;
        if (pendientes === 0) {
          this.list.terminadaEn = new Date();
          this.list.terminada = true;
        } else {
          this.list.terminadaEn = null;
          this.list.terminada = false;
        }      

  this.deseosService.guardarStorage();
  console.log(this.deseosService.list); 
  
  }

  delete(i:number){

    this.list.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }
}

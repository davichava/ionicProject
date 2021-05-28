import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { AlertController, IonList } from '@ionic/angular';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})

export class ListsComponent implements OnInit {

  @ViewChild( IonList ) list: IonList;
  @Input() terminados = true;

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController ) { }

  ngOnInit() {}


  
  listaSelecionada( list: List){
  
    if (this.terminados) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ list.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ list.id}`);
    }     
  
  }

 async editList( list: List){

    const alert = await this.alertCtrl.create({
      header: 'Edit List',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          value: list.titulo,
          placeholder: 'nombre dela lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
            this.list.closeSlidingItems();
            
          }
        },
        {
          text: 'Edit',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }  
            list.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.list.closeSlidingItems();
          }
        }
      ]
    });
     alert.present();


  }

  deleteList( list: List){
  this.deseosService.deleteList( list );
  }
}

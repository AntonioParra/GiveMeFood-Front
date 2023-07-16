import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tag, TipoTag, Usuario } from 'src/app/types/types';

@Component({
  selector: 'app-restaurant-filter-popup',
  templateUrl: './restaurant-filter-popup.component.html',
  styleUrls: ['./restaurant-filter-popup.component.scss']
})
export class RestaurantFilterPopupComponent {

  public users: {user: Usuario, selected: boolean}[];
  public tags: any[]; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { users: Usuario[], tags: TipoTag[] }
  ) {
    this.users = data.users.sort((a1, a2) => a1.apodo.toUpperCase() < a2.apodo.toUpperCase() ? -1 : 1).map(item => ({
      user: item,
      selected: false
    }));

    data.tags.sort((a1, a2) => a1.nombre.toUpperCase() < a2.nombre.toUpperCase() ? -1 : 1);
    this.tags = data.tags.map(item => ({
      IDTipoTag: item.IDTipoTag,
      nombre: item.nombre,
      GMFTagsCollection: item.GMFTagsCollection?.map(item2 => ({
        tag: item2,
        selected: false
      })).sort((a1, a2) => a1.tag.nombreTag.toUpperCase() < a2.tag.nombreTag.toUpperCase() ? -1 : 1)
    }));
  }

  getSelected() {
    return {
      users: this.users.filter(item => item.selected).map(item => item.user),
      tags: this.tags.reduce((acc, cur) => acc.concat(cur.GMFTagsCollection.filter((item: { selected: any; }) => item.selected).map((item: { tag: any; }) => item.tag)), [])
    }
  }
}

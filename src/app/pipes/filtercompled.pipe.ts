import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list.model';

@Pipe({
  name: 'filtercompled',
  pure: false
})
export class FiltercompledPipe implements PipeTransform {

  transform(list: List[], compled: boolean = true): List[] {

    return list.filter(list =>  list.terminada === compled);
  }

}

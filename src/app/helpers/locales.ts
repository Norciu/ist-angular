import { MatPaginatorIntl } from '@angular/material/paginator';

export class Locales {
  public static paginatorPl(): MatPaginatorIntl {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Liczba obiektów na stronie:';
    paginatorIntl.nextPageLabel = 'Następna strona';
    paginatorIntl.previousPageLabel = 'Poprzednia strona';

    return paginatorIntl;
  }
}

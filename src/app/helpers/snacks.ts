import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Snacks {

  constructor(private snack: MatSnackBar) {
  }
  public dangerInfo(message: string): void {
    this.snack.open(message, '', {
      duration: 3000,
      panelClass: 'danger-snackbar',
    });
  }

  public successInfo(message: string): void {
    this.snack.open(message, '', {
      duration: 3000,
      panelClass: '',
    });
  }
}

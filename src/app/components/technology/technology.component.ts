import { Component, OnDestroy, OnInit } from '@angular/core';
import { TechnologyService } from '../../services/technology/technology.service';
import { TechnologyDatabaseInterface } from '../../interfaces/technology.interface';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Snacks } from '../../helpers/snacks';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss'],
})
export class TechnologyComponent implements OnInit, OnDestroy {
  technologies: TechnologyDatabaseInterface[];
  techInput = this.fb.control('', [Validators.required]);
  techExist: boolean;
  inputWatcher: Subscription;

  constructor(
    private technologyService: TechnologyService,
    private fb: FormBuilder,
    private snack: Snacks
  ) {}

  ngOnInit(): void {
    this.technologyService
      .getTechnologies()
      .subscribe(
        (val: TechnologyDatabaseInterface[]) => (this.technologies = val)
      );
    this.inputWatcher = this._techExistWatcher().subscribe();
  }

  ngOnDestroy(): void {
    this.inputWatcher.unsubscribe();
  }

  private _techExistWatcher(): Observable<any> {
    return this.techInput.valueChanges.pipe(
      map((techProperty) => {
        this._filter(techProperty);
      })
    );
  }

  private _filter(value: string): TechnologyDatabaseInterface[] {
    const lowerValue = value.toLowerCase();
    const res = this.technologies.filter((val) => {
      const exist = val.technologyName.toLocaleLowerCase() === lowerValue;
      const err = exist ? { exist } : null;
      return this.techInput.setErrors(err);
    });
    return res;
  }

  add(): void {
    const technologyName = this.techInput.value;
    if (!this.techExist) {
      this.technologyService
        .addTechnologyToDatabase(technologyName)
        .subscribe((value: { status: 'Added' }) => {
          this.snack.successInfo('Pomyślnie dodano nową technologię!');
        });
    } else {
      this.snack.dangerInfo('Podana technologia już istnieje!');
    }
  }
}

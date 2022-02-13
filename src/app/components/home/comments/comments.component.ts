import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from '../home.component';
import { CommentsService, GetComments } from './comments.service';

export interface DialogData {
  locationId: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  description: string;

  comments: GetComments[];

  total: number;

  locationId: string = this.data.locationId;

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private commentService: CommentsService
  ) {}

  async ngOnInit(): Promise<void> {
    const { result, total } = await this.readComments(this.data.locationId);
    this.comments = result;
    this.total = total;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async add(locationId: string, description: string): Promise<void> {
    const { result, total } = await this.commentService.add(locationId, description).toPromise();
    this.comments = result;
    this.total = total;
  }

  async readComments(location_id: string | number) {
    return this.commentService.getComments(location_id).toPromise();
  }
}

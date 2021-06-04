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

  locationId: string = this.data.locationId;

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private commentService: CommentsService
  ) {}

  ngOnInit(): void {
    this.commentService.getComments(this.data.locationId).subscribe(comments => this.comments = comments);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(locationId: string, description: string): void {
    this.commentService.add(locationId, description).subscribe(val => {
      this.description = '';
      this.ngOnInit();
    } );
  }
}

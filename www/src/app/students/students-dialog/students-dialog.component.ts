import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title?: string;
  message?: string;
}

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: [ './students-dialog.component.css' ]
})
export class StudentsDialogComponent<DialogRef> {

  constructor (private dialogRef: MatDialogRef<DialogRef>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(response: boolean): void {
    this.dialogRef.close(response);
  }
}

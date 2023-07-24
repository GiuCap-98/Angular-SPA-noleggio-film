import { DIALOG_DATA, DialogRef,  } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent {
  text!: string;
  constructor(
    @Inject(DIALOG_DATA) public data: {text:string},
    public dialogRef: DialogRef<DialogComponentComponent>
  ) {
  }

  close(): void {
    this.dialogRef.close();
  }
}

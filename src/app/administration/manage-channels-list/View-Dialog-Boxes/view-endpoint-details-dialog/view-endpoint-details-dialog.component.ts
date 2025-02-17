import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-endpoint-details-dialog',

  templateUrl: './view-endpoint-details-dialog.component.html',
  styleUrl: './view-endpoint-details-dialog.component.css'
})
export class ViewEndpointDetailsDialogComponent {
 constructor(public dialogRef: MatDialogRef<ViewEndpointDetailsDialogComponent>) { }
}

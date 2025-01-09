import { CdkDragDrop, CdkDragEnter, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dummy-drag-and-drop',
  standalone: true,
  imports: [DragDropModule,CommonModule],
  templateUrl: './dummy-drag-and-drop.component.html',
  styleUrl: './dummy-drag-and-drop.component.css'
})
export class DummyDragAndDropComponent { box1Items = [
  { id: 1, label: 'abc' },
  { id: 42, label: 'abc2' },
];

box2Items = [
  { id: 2, label: 'def1' },
  { id:52, label: 'def2' },
];

onDrop(event: CdkDragDrop<any>) {
  // Get the dragged item data
  const draggedItem = event.item.data;

  // Get the target list to append the dragged item
  const targetList = this.box2Items;

  // Update the content of the dropped element (e.g., def1 + abc)
  const updatedLabel = targetList[0].label + draggedItem.label;

  // Add the updated item to box2
  targetList[0].label = updatedLabel;

  // Optionally, send the ids of the dragged and dropped elements to the backend
  this.sendIdsToBackend(draggedItem.id, targetList[0].id);
}

sendIdsToBackend(draggedId: number, targetId: number) {
  // Make a backend API call here to send the IDs
  console.log('Sending to backend:', { draggedId, targetId });
}
}
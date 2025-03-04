import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-preview-message-routing',
  templateUrl: './preview-message-routing.component.html',
  styleUrl: './preview-message-routing.component.css'
})
export class PreviewMessageRoutingComponent {

    form = new FormGroup({
   
  
     
  
        sourceChannelId: new FormControl('', [Validators.required]),
  
        sourceMessageId: new FormControl('', [Validators.required]),
        sourceFieldId: new FormControl('', [Validators.required]),
        destinationChannelId: new FormControl('', [Validators.required]),
        destinationMessageId: new FormControl('', [Validators.required]),
        destinationFieldId: new FormControl('', [Validators.required]),
        internalTag: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z0-9])[A-Za-z0-9 ._()-]+$'),
        Validators.maxLength(50),]),
  
  
  
    })
    constructor(private util: UtilityService, private fb: FormBuilder, private service: ApiService,) { }
    ngOnInit(): void {
  
    }

    onSubmit(){}
    list1 = [
      { id: 1, name: 'Item 1', relatedId: 101, description: 'Description for Item 1' },
      { id: 2, name: 'Item 2', relatedId: 102, description: 'Description for Item 2' },
      { id: 3, name: 'Item 3', relatedId: 103, description: 'Description for Item 3' },
      { id: 4, name: 'Item 4', relatedId: 104, description: 'Description for Item 4' },
      { id: 5, name: 'Item 5', relatedId: 105, description: 'Description for Item 5' },
      { id: 6, name: 'Item 6', relatedId: 106, description: 'Description for Item 6' },
      { id: 7, name: 'Item 7', relatedId: 107, description: 'Description for Item 7' },
      { id: 8, name: 'Item 8', relatedId: 108, description: 'Description for Item 8' },
      { id: 9, name: 'Item 9', relatedId: 109, description: 'Description for Item 9' },
      { id: 10, name: 'Item 10', relatedId: 110, description: 'Description for Item 10' },
      { id: 11, name: 'Item 11', relatedId: 111, description: 'Description for Item 11' },
      { id: 12, name: 'Item 12', relatedId: 112, description: 'Description for Item 12' },
      { id: 13, name: 'Item 13', relatedId: 113, description: 'Description for Item 13' },
      { id: 14, name: 'Item 14', relatedId: 114, description: 'Description for Item 14' },
      { id: 15, name: 'Item 15', relatedId: 115, description: 'Description for Item 15' },
      { id: 16, name: 'Item 16', relatedId: 116, description: 'Description for Item 16' },
      { id: 17, name: 'Item 17', relatedId: 117, description: 'Description for Item 17' },
      { id: 18, name: 'Item 18', relatedId: 118, description: 'Description for Item 18' },
      { id: 19, name: 'Item 19', relatedId: 119, description: 'Description for Item 19' },
      { id: 20, name: 'Item 20', relatedId: 120, description: 'Description for Item 20' },
    ];
    
    list2 = [
      { id: 116, name: 'Detail P' },
      { id: 105, name: 'Detail E' },
      { id: 101, name: 'Detail A' },
      { id: 118, name: 'Detail R' },
      { id: 104, name: 'Detail D' },
      { id: 112, name: 'Detail L' },
      { id: 103, name: 'Detail C' },
      { id: 113, name: 'Detail M' },
      { id: 114, name: 'Detail N' },
      { id: 111, name: 'Detail K' },
      { id: 117, name: 'Detail Q' },
      { id: 108, name: 'Detail H' },
      { id: 106, name: 'Detail F' },
      { id: 119, name: 'Detail S' },
      { id: 110, name: 'Detail J' },
      { id: 115, name: 'Detail O' },
      { id: 120, name: 'Detail T' },
      { id: 102, name: 'Detail B' },
      { id: 107, name: 'Detail G' },
    ];
    

    selectedDetailId: number | null = null;
    selectedDescription: string = '';
  
    @ViewChild('list2Container') list2Container!: ElementRef;
    @ViewChild('list2Items', { read: ElementRef }) list2Items!: ElementRef;
  
    onSelect(item: any) {
      this.selectedDetailId = item.relatedId;
      this.selectedDescription = item.description;
  
      setTimeout(() => {
        const selectedElement = document.getElementById(`detail-${this.selectedDetailId}`);
        if (selectedElement) {
          selectedElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }

}

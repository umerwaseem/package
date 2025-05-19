import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UtilityService } from '../../../../services/utility.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Source Channel 2',
    children: [
      {
        name: 'Routing Channel 1',
        children: [
          { name: 'Destination Channel 1' },
          { name: 'Destination Channel 2' },
        ]
      }, {
        name: 'Routing Channel 2',
        children: [
          { name: 'Destination Channel 1' },
          { name: 'Destination Channel 2' },
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}



@Component({
  selector: 'app-preview-message-routing',
  templateUrl: './preview-message-routing.component.html',
  styleUrl: './preview-message-routing.component.css'
})
export class PreviewMessageRoutingComponent {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
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
  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }

  onSubmit(){}

  transactionData = {
    transactionId: '123456',
    customerName: 'John Doe',
    status: 'Approved',
    panels: [
      {
        title: 'Source Channel 2',
        description: [{
          SchemeName: 'NADRA',
          trancode : '344asd',
          DestQueue : 'asd', 
          DestEndpoint : 'qwerty',
        }],
        children: [
          {
            title: 'Routing Channel ',
            description: [{
              SchemeName: 'NADRA',
              trancode : '344asd',
              DestQueue : 'asd', 
              DestEndpoint : 'qwerty',
            }],
            children: [
              {
                title: 'Destination Channel',
                description: [{
                  SchemeName: 'NADRA',
                  trancode : '344asd',
                  DestQueue : 'asd', 
                  DestEndpoint : 'qwerty',
                }],
              }
            ]
          }
        ]
      }
    ]
  };
}



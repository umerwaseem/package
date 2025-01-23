import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-institution-details',

  templateUrl: './add-institution-details.component.html',
  styleUrl: './add-institution-details.component.css'
})
export class AddInstitutionDetailsComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl(''),
    field2: new FormControl(''),
  })

 constructor(private service: ApiService,) { }
  ngOnInit(): void {
 
  }

  onSubmit() {
    console.log('Form Data:', this.form.value);
  }
}

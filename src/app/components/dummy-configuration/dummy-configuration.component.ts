import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dummy-configuration',
  standalone: true,
    providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterLink,
    NgClass, 
    
  ],
  templateUrl: './dummy-configuration.component.html',
  styleUrl: './dummy-configuration.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DummyConfigurationComponent implements OnInit{
  isData: any
  step = 0;
  form= new FormGroup({
    firstName: new FormControl(''),
    duplicateFirstName: new FormControl(''),
  })
  constructor() {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.form.get('firstName')?.valueChanges.subscribe((value) => {
        this.form.get('duplicateFirstName')?.setValue(value);
      });
    }, 0);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}

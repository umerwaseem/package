import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule, NgClass } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { RouterLink } from "@angular/router";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      MatExpansionModule,
      FormsModule, // Import FormsModule
      ReactiveFormsModule, // Import ReactiveFormsModule
      MatDatepickerModule,
      MatInputModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      MatCardModule,
      MatTableModule,
      MatPaginatorModule,
      MatButtonModule,
      MatDividerModule,
      MatSlideToggleModule,
      MatIconModule ,
      MatCheckboxModule ,
      MatTooltipModule,
      MatRadioModule,
      MatTreeModule,
      MatTabsModule,
      MatChipsModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      DragDropModule,
      MatListModule,
      MatBottomSheetModule,
      RouterLink,FormsModule,      
      NgClass,
       MatMenuModule,
      MatButtonToggleModule,

     ],
    exports: [
      CommonModule,
      MatExpansionModule,
      FormsModule, // Import FormsModule
      ReactiveFormsModule, // Import ReactiveFormsModule
      MatDatepickerModule,
      MatInputModule,
      MatSelectModule,
      MatProgressSpinnerModule,
      MatCardModule,
      MatTableModule,
      MatPaginatorModule,
      MatButtonModule,
      MatDividerModule,
      MatSlideToggleModule,
      MatIconModule ,
      MatCheckboxModule ,
      MatTooltipModule,
      MatRadioModule,
      MatTreeModule,
      MatTabsModule,
      MatChipsModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      DragDropModule,
      MatListModule,

      RouterLink,FormsModule,      
      NgClass,
       MatMenuModule,
      MatButtonToggleModule,
  MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
     ]
  })
  export class MaterialUiModule { }
  
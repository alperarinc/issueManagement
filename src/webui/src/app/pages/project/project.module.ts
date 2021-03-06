import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project.routing.module';
import { ProjectService } from 'src/app/services/shared/project.service';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { SharedModule } from 'src/app/shared/shared.module';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({

  declarations: [
    ProjectComponent
  ],

  imports: [
    CommonModule,
    ProjectRoutingModule,
    NgxDatatableModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[ProjectService]
})
export class ProjectModule { }

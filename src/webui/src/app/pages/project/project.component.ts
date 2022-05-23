import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Page} from 'src/app/common/page';
import {Project} from 'src/app/common/project.model';
import {ProjectService} from 'src/app/services/shared/project.service';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationComponent} from "../../shared/confirmation/confirmation.component";
import {UserService} from "../../services/shared/user.service";


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  modalRef: BsModalRef;
  projectFrom: FormGroup

  @ViewChild('tplProjectDeleteCell') tplProjectDeleteCell: TemplateRef<any>

  page = new Page();
  cols = [];
  rows = [];
  managerOptions = [];


  constructor(private projectService: ProjectService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private userService: UserService) {
  };

  ngOnInit(): void {
    this.cols = [
      {prop: 'id', name: 'No'},
      {prop: 'projectName', name: 'Project Name', sortable: false},
      {prop: 'projectCode', name: 'Project Code', sortable: false},
      {prop: 'manager.nameSurname', name: 'Manager', sortable: false},
      {prop: 'id', name: 'Actions', cellTemplate: this.tplProjectDeleteCell, flexGrow: 1, sortable: false}
    ];

    this.setPage({offset: 0});

    this.projectFrom = this.formBuilder.group({
      'projectCode': [null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      'projectName': [null, [Validators.required, Validators.minLength(4)]],
      'managerId': [null, [Validators.required,]]
    });

    this.userService.getAll().subscribe(res => {
      this.managerOptions = res;
      console.log(res);
    });

  };

  get f() {
    return this.projectFrom.controls
  };

  saveProject() {
    if (!this.projectFrom.valid)
      return;

    this.projectService.CreateProject(this.projectFrom.value).subscribe(
      response => {
        this.setPage(this.page);
        this.closeAndResetModal();
      }
    )
  };

  closeAndResetModal() {
    this.projectFrom.reset();
    this.modalRef.hide();
  };


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  };

  setPage(pageInfo) {
    this.page.page = pageInfo.offset;
    this.projectService.getAll(this.page).subscribe(pagedData => {
      this.page.size = pagedData.size;
      this.page.page = pagedData.number;
      this.page.totalElements = pagedData.totalElements;
      this.rows = pagedData.content;


    });
  };

  showProjectDeleteConfirmation(value) {
    const modal = this.modalService.show(ConfirmationComponent);
    (<ConfirmationComponent>modal.content).showConfirmation(
      'Delete Confirmation',
      'Are You Sure For Delete Project'
    );
    (<ConfirmationComponent>modal.content).onClose.subscribe(result => {
        if (result === true) {
          this.projectService.delete(value).subscribe(response => {
            if (response === true)
              this.setPage({offset: 0})
          })
        } else if (result === false) {
        }
      }
    );
  }
}

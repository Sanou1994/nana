

import { Telechargement } from 'src/app/models/telechargement';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ButTelechargementService } from '../../../services/butTelechargement/butTelechargement.service';
import { ButTelechargement } from 'src/app/models/butTelechargement';
import { Version } from 'src/app/models/version';
import { Router } from '@angular/router';
import { VersionService } from 'src/app/services/version/version.service';
import { TelechargementService } from '../../../services/telechargement/telechargement.service';

@Component({
  selector: 'app-telechargement',
  templateUrl: './telechargement.component.html',
  styleUrls: ['./telechargement.component.css']
})
export class TelechargementComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  telechargements!: Telechargement[];
  telechargement: Telechargement = {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  message: any;
  dialogErrorMessage: any;
  butTelechargements!: ButTelechargement[];
  selectedtelechargement!: ButTelechargement;
  versions!: Version[];
  selectedVersion!: Version;


  constructor(private telechargementService: TelechargementService,
    private butTelechargementService: ButTelechargementService,
    private versionService: VersionService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.load();
    this.loadModelUtiliteLog();
    this.loadVersion();
  }

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.telechargementService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.telechargements = response.telechargements;
      console.log(this.telechargements);
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadModelUtiliteLog(event?: LazyLoadEvent) {
    this.butTelechargementService.getAll(event).subscribe(response => {
      this.butTelechargements = response.butTelechargements;
      console.log(this.butTelechargements);
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }


  loadVersion(event?: LazyLoadEvent) {
    this.versionService.getAll().subscribe(response => {
      this.versions = response.result as Version[];
      console.log(this.versions);
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Détail
  onInfo(selection: any) {
    console.log(selection);
    /* localStorage.removeItem("category");
    localStorage.setItem("category",JSON.stringify(selection));
    this.router.navigate(['/admin/sous-category']); */
  }

  save() {
    if (this.telechargement.id) {
      this.edit();
    } else {
      this.create();
    }
  }


  //Creation
  onCreate() {
    this.telechargement = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }


  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.telechargementService.create(this.telechargement).subscribe(response => {
      if (this.telechargements.length !== this.recordsPerPage) {
        this.telechargements.push(response);
        this.telechargements = this.telechargements.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'telechrgement créé avec succes' });
    }, error => this.handleError(error));
  }


  // Edit
  onEdit(selection: any) {
    console.log(selection);
    this.telechargement = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.telechargementService.update(this.telechargement).subscribe(response => {
      let index = this.telechargements.findIndex(telechargement => telechargement.id === response.id);
      this.telechargements[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'telechargement modifié avec succès' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.telechargement.id;
  }


  // Deletion
  onDelete(selection: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection: any) {
    console.log(selection.id_log);
    this.isOpInProgress = true;
    this.telechargementService.delete(selection.id_log).subscribe(() => {
      this.telechargements = this.telechargements.filter(telechargement => telechargement.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'telech supprimé avec succès' });
    }, error => {
      console.error(JSON.stringify(error));
      this.isOpInProgress = false;
      this.showMessage({ severity: 'error', summary: error.error.message });
    });
  }

  // Errors
  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.message;
  }

  // Messages
  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }
}

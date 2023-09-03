import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ButTelechargementService } from '../../../services/butTelechargement/butTelechargement.service';
import { ButTelechargement } from 'src/app/models/butTelechargement';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ButTelechargement',
  templateUrl: './butTelechargement.component.html',
  styleUrls: ['./butTelechargement.component.css']
})
export class UtiliteLogicielComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  butTelechargements!: ButTelechargement[]  //listutilitelog est butTelechargements
  butTelechargement: ButTelechargement = {};  //utilitelog est butTelechargement
  enableCreate = true;
  enableBtnInfo = false;//bouton détail désactivé
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  message: any;
  dialogErrorMessage: any;


  constructor(private butTelechargementSer:ButTelechargementService,
    private confirmationService: ConfirmationService,
    private router : Router) { }

  ngOnInit(): void {
    this.load();
  }

  load(event?: LazyLoadEvent) {
     this.isLoading = true;
    this.butTelechargementSer.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.butTelechargements = response.butTelechargements;
      console.log(this.butTelechargements);
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Détail
  onInfo(selection:any){
    /*localStorage.removeItem("editeur");
    localStorage.setItem("editeur",JSON.stringify(selection));
    this.router.navigate(['/admin/sous-category']);*/
  }

  save() {
    if (this.butTelechargement.id) {
      this.edit();
    } else {
      this.create();
    }
  }


   //Creation
   onCreate() {
    this.butTelechargement = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.butTelechargementSer.create(this.butTelechargement).subscribe(response => {
      if (this.butTelechargements.length !== this.recordsPerPage) {
        this.butTelechargements.push(response);
        this.butTelechargements= this.butTelechargements.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Utilité créée avec succès' });
    }, error => this.handleError(error));
  }


   // Edit
   onEdit(selection:any) {
     console.log(selection);
    this.butTelechargement = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.butTelechargementSer.update(this.butTelechargement).subscribe(response => {
      let index = this.butTelechargements.findIndex(util_log => util_log.id === response.id);
      this.butTelechargements[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Utilité modifiée avec succès' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.butTelechargement.id;
  }


  // Deletion
  onDelete(selection:any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection:any) {
    console.log(selection.id);
    this.isOpInProgress = true;
    this.butTelechargementSer.delete(selection.id_but).subscribe(() => {
      this.butTelechargements = this.butTelechargements.filter(util_log => util_log.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Utilite supprimée avec succès' });
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

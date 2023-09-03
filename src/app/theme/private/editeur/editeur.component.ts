import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { EditeurService } from '../../../services/editeur/editeur.service';
import { Editeur } from 'src/app/models/editeur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editeur',
  templateUrl: './editeur.component.html',
  styleUrls: ['./editeur.component.css']
})
export class EditeurComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  editeurs!: Editeur[]
  editeur: Editeur = {};
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


  constructor(private editeurService: EditeurService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.editeurService.getAll().subscribe(response => {
      this.isLoading = false;
      this.editeurs = response.result as Editeur[];
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Détail
  onInfo(selection: any) {
    /*localStorage.removeItem("editeur");
    localStorage.setItem("editeur",JSON.stringify(selection));
    this.router.navigate(['/admin/sous-category']);*/
  }

  save() {
    if (this.editeur.id) {
      this.edit();
    } else {
      this.create();
    }
  }


  //Creation
  onCreate() {
    this.editeur = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }


  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.editeurService.createOrUpdate(this.editeur).subscribe(response => {
      if (response.code == 200) {
        if (this.editeurs.length !== this.recordsPerPage) {
          this.editeurs.push(response.result as Editeur);
          this.editeurs = this.editeurs.slice();
        }
        this.totalRecords++;
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'success', summary: response.message?.toString() });

      }
      else {
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'echec', summary: response.message?.toString() });

      }



    }, error => this.handleError(error));
  }


  // Edit
  onEdit(selection: any) {
    console.log(selection);
    this.editeur = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.editeurService.createOrUpdate(this.editeur).subscribe(response => {

      if (response.code == 200) {
        let editeurReponse = response.result as Editeur
        let index = this.editeurs.findIndex(editeur => editeur.id === editeurReponse.id);
        this.editeurs[index] = editeurReponse;
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'success', summary: 'Editeur modifié avec succès' });
      }
      else {
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'echec', summary: response.message?.toString() });

      }
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.editeur.id;
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
    console.log(selection.id);
    this.isOpInProgress = true;
    this.editeurService.delete(selection.id).subscribe((response) => {

      if (response.code == 200) {
        this.editeurs = this.editeurs.filter(editeur => editeur.id !== selection.id);
        selection = null;
        this.isOpInProgress = false;
        this.totalRecords--;
        this.showMessage({ severity: 'success', summary: response.message?.toString() });
        window.location.reload()
      }
      else {
        this.isOpInProgress = false;
        selection = null;
        this.showMessage({ severity: 'echec', summary: response.message?.toString() });

      }



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

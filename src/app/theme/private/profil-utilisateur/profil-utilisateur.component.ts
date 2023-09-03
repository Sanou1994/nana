import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ProfilUtilisateurService } from '../../../services/profil_utilisateur/profilutilisateur.service';
import { ProfilUtilisateur } from 'src/app/models/profilUtilisateur';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profilutilisateur',
  templateUrl: './profil-utilisateur.component.html',
  styleUrls: ['./profil-utilisateur.component.css']
})
export class ProfilUtilisateurComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  profilutilisateurs!: ProfilUtilisateur[]
  profilutilisateur: ProfilUtilisateur = {};
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


  constructor(private profilutilisateurService:ProfilUtilisateurService,
    private confirmationService: ConfirmationService,
    private router : Router) { }

  ngOnInit(): void {
    this.load();
    
  }

  load(event?: LazyLoadEvent) {
     this.isLoading = true;
    this.profilutilisateurService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.profilutilisateurs = response.profilutilisateurs;
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
    if (this.profilutilisateur.id) {
      this.edit();
    } else {
      this.create();
    }
  }


   //Creation
   onCreate() {
    this.profilutilisateur = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }


  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.profilutilisateurService.create(this.profilutilisateur).subscribe(response => {
      if (this.profilutilisateurs.length !== this.recordsPerPage) {
        this.profilutilisateurs.push(response);
        this.profilutilisateurs = this.profilutilisateurs.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Editeur créé avec succès' });
    }, error => this.handleError(error));
  }


   // Edit
   onEdit(selection:any) {
    this.profilutilisateur = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.profilutilisateurService.update(this.profilutilisateur).subscribe(response => {
      let index = this.profilutilisateurs.findIndex(profilutilisateur => profilutilisateur.id === response.id);
      this.profilutilisateurs[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Profil Utilisateur modifié avec succès' });
    }, error => this.handleError(error));
  } 


  isEditing() {
    return !!this.profilutilisateur.id;
  }

  // Deletion
  onDelete(selection:any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection:any) {
    this.isOpInProgress = true;
    this.profilutilisateurService.delete(selection.id).subscribe(() => {
      this.profilutilisateurs = this.profilutilisateurs.filter(profilutilisateur => profilutilisateur.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Profil supprimé avec succès' });
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

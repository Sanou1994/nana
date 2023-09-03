import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { ProfilUtilisateurService } from '../../../services/profil_utilisateur/profilutilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur';
import { ProfilUtilisateur } from 'src/app/models/profilUtilisateur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  utilisateurs!: Utilisateur[];
  utilisateur: Utilisateur = {};
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
  profil_utilisateur!: ProfilUtilisateur[];
  selectedProfilUtilisateur!: ProfilUtilisateur;


  constructor(
    private utilisateurService:UtilisateurService,
    private profilutilisateurService:ProfilUtilisateurService,
    private confirmationService: ConfirmationService,
    private router : Router) { }

  ngOnInit(): void {
    this.load();
    this.loadProfilUtilisateur();
  }

  load(event?: LazyLoadEvent) {
     this.isLoading = true;
    this.utilisateurService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.utilisateurs = response.utilisateurs;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadProfilUtilisateur(event?: LazyLoadEvent) {
   this.profilutilisateurService.getAll(event).subscribe(response => {
     this.profil_utilisateur = response.profilutilisateurs;
     console.log(this.profil_utilisateur);
   }, error => {
     this.message = { severity: 'error', summary: error.error };
     console.error(JSON.stringify(error));
   });
 }


  //Détail
  onInfo(selection:any){
    console.log(selection);
    /* localStorage.removeItem("category");
    localStorage.setItem("category",JSON.stringify(selection));
    this.router.navigate(['/admin/sous-category']); */
  }

  save() {
    if (this.utilisateur.id) {
      this.edit();
    } else {
      this.create();
    }
  }


   //Creation
   onCreate() {
    this.utilisateur = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }


  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.utilisateurService.create(this.utilisateur).subscribe(response => {
      if (this.utilisateurs.length !== this.recordsPerPage) {
        this.utilisateurs.push(response);
        this.utilisateurs = this.utilisateurs.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Utilisateur créé avec succes' });
    }, error => this.handleError(error));
  }


   // Edit
   onEdit(selection:any) {
     console.log(selection);
    this.utilisateur = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.utilisateurService.update(this.utilisateur).subscribe(response => {
      let index = this.utilisateurs.findIndex(utilisateur => utilisateur.id === response.id);
      this.utilisateurs[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Utilisateur modifié avec succès' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.utilisateur.id;
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
    console.log(selection.id);
    this.isOpInProgress = true;
    this.utilisateurService.delete(selection.id).subscribe(() => {
      this.utilisateurs = this.utilisateurs.filter(utilisateur => utilisateur.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Utilisateur supprimé avec succès' });
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

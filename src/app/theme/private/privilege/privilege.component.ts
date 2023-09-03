import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { PrivilegeService } from '../../../services/privilege/privilege.service';
import { ProfilUtilisateurService } from '../../../services/profil_utilisateur/profilutilisateur.service';
import { Privilege } from 'src/app/models/privilege';
import { ProfilUtilisateur } from 'src/app/models/profilUtilisateur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  privileges!: Privilege[];
  privilege: Privilege = {};
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
    private privilegeService:PrivilegeService,
    private profilutilisateurService:ProfilUtilisateurService,
    private confirmationService: ConfirmationService,
    private router : Router) { }

  ngOnInit(): void {
    this.load();
    this.loadProfilUtilisateur();
  }

  load(event?: LazyLoadEvent) {
     this.isLoading = true;
    this.privilegeService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.privileges = response.privileges;
      console.log(this.privileges);
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
    if (this.privilege.id) {
      this.edit();
    } else {
      this.create();
    }
  }


   //Creation
   onCreate() {
    this.privilege = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }


  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.privilegeService.create(this.privilege).subscribe(response => {
      if (this.privileges.length !== this.recordsPerPage) {
        this.privileges.push(response);
        this.privileges = this.privileges.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Privilege créé avec succes' });
    }, error => this.handleError(error));
  }


   // Edit
   onEdit(selection:any) {
     console.log(selection);
    this.privilege = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.privilegeService.update(this.privilege).subscribe(response => {
      let index = this.privileges.findIndex(privilege => privilege.id === response.id);
      this.privileges[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Privilège modifié avec succès' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.privilege.id;
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
    console.log(selection.id_uti);
    this.isOpInProgress = true;
    this.privilegeService.delete(selection.id_uti).subscribe(() => {
      this.privileges = this.privileges.filter(privilege => privilege.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Privilege supprimé avec succès' });
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

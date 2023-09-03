import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { CompatibiliteOSService } from '../../../services/compatibiliteOS/compatibilite-os.service';
import { Compatibilite_os} from 'src/app/models/compatibiliteOS';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compatibilite-os',
  templateUrl: './compatibilite-os.component.html',
  styleUrls: ['./compatibilite-os.component.css']
})
export class CompatibiliteOsComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  listcompatibiliteOS!: Compatibilite_os[]
  compatibiliteOS: Compatibilite_os = {};
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


  constructor(private compatibiliteOSService:CompatibiliteOSService,
    private confirmationService: ConfirmationService,
    private router : Router) { }

  ngOnInit(): void {
    this.load();
  }

  load(event?: LazyLoadEvent) {
     this.isLoading = true;
    this.compatibiliteOSService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.listcompatibiliteOS = response.compatibiliteOSList;
      console.log('************ liste COS: ',this.listcompatibiliteOS);
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
    if (this.compatibiliteOS.id) {
      this.edit();
    } else {
      this.create();
    }
  }


   //Creation
   onCreate() {
    this.compatibiliteOS = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.compatibiliteOSService.create(this.compatibiliteOS).subscribe(response => {
      if (this.listcompatibiliteOS.length !== this.recordsPerPage) {
        this.listcompatibiliteOS.push(response);
        this.listcompatibiliteOS = this.listcompatibiliteOS.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Système d\'exploitation créé avec succès' });
    }, error => this.handleError(error));
  }


   // Edit
   onEdit(selection:any) {
     console.log(selection);
    this.compatibiliteOS = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.compatibiliteOSService.update(this.compatibiliteOS).subscribe(response => {
      let index = this.listcompatibiliteOS.findIndex(comp_OS => comp_OS.id === response.id);
      this.listcompatibiliteOS[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Système d\'exploitation modifié avec succès' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.compatibiliteOS.id;
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
    this.compatibiliteOSService.delete(selection.id).subscribe(() => {
      this.listcompatibiliteOS = this.listcompatibiliteOS.filter(comp_os => comp_os.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Système d\'exploitation supprimé avec succès' });
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

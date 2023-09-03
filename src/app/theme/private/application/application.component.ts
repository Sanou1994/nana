import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ApplicationService } from '../../../services/application/apllication.service';
import { Logiciel, LogicielDTO } from 'src/app/models/logiciel';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Categorie } from 'src/app/models/categorie';
import { EditeurService } from '../../../services/editeur/editeur.service';
import { Editeur } from 'src/app/models/editeur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  logiciels!: Logiciel[];
  logiciel: Logiciel = {};
  logicielDTO: LogicielDTO = {};
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
  categories!: Categorie[];
  selectedCategory!: Categorie;
  editeurs!: Editeur[];
  selectedEditeur!: Editeur;


  constructor(
    private applicationService: ApplicationService,
    private categorieService: CategorieService,
    private editeurService: EditeurService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.load();
    this.loadCategorie();
    this.loadEditeur();
  }

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.applicationService.getAll().subscribe(response => {
      this.isLoading = false;
      this.logiciels = response.result as Logiciel[];
      console.log(this.logiciels);
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadCategorie(event?: LazyLoadEvent) {
    this.categorieService.getAll().subscribe(response => {
      this.categories = response.result as Categorie[];
    }, error => {
      this.message = { severity: 'error', summary: error.error };
    });
  }


  loadEditeur(event?: LazyLoadEvent) {
    this.editeurService.getAll().subscribe(response => {
      this.editeurs = response.result as Editeur[];
      console.log(this.logiciels);
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
    if (this.logiciel.id) {
      this.edit();
    } else {
      this.create();
    }
  }


  //Creation
  onCreate() {
    this.logiciel = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }


  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.applicationService.create(this.logiciel).subscribe(response => {
      if (response.code == 200) {
        if (this.logiciels.length !== this.recordsPerPage) {
          this.logiciels.push(response.result as Logiciel);
          this.logiciels = this.logiciels.slice();
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
    this.logiciel = selection as Logiciel
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.applicationService.create(this.logiciel).subscribe(response => {
      if (response.code == 200) {
        let cat = response.result as Logiciel
        let index = this.logiciels.findIndex(logiciel => logiciel.id === cat.id);
        this.logiciels[index] = cat;
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

  isEditing() {
    return !!this.logiciel.id;
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
    this.isOpInProgress = true;
    this.applicationService.delete(selection.id).subscribe(response => {
      if (response.code == 200) {
        this.logiciels = this.logiciels.filter(logiciel => logiciel.id !== selection.id);
        selection = null;
        this.isOpInProgress = false;
        this.totalRecords--;
        this.showMessage({ severity: 'success', summary: response.message?.toString() });
      }
      else {
        this.isOpInProgress = false;
        selection = null;
        this.showMessage({ severity: 'echec', summary: response.message?.toString() });

      }


    }, error => {
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

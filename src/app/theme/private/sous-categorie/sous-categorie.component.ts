import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Categorie } from 'src/app/models/categorie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sous-categorie',
  templateUrl: './sous-categorie.component.html',
  styleUrls: ['./sous-categorie.component.css']
})
export class SousCategorieComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  categories!: Categorie[]
  categoriesMeres!: Categorie[]
  categorie: Categorie = {};
  enableCreate = true;
  enableBtnInfo = false;
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  message: any;
  dialogErrorMessage: any;
  categorieMereLibelle!: string;


  constructor(private categorieService: CategorieService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.load();
    this.loadCategoriesMere();
  }


  load(event?: LazyLoadEvent) {
    const categorieID = localStorage.getItem("categorieID");
    const categorieLibelle = localStorage.getItem("categorieLibelle");

    if (categorieID && categorieLibelle) {
      this.categorieMereLibelle = categorieLibelle;
      this.categorieService.getSouscategorieById(localStorage.getItem("categorieID")).subscribe(p => {
        if (p.code == 200) {
          this.categories = p.result as Categorie[];
        }
        else {

        }
      })

    }
  }

  loadCategoriesMere(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.categorieService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.categoriesMeres = response.result as Categorie[];
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }



  save() {
    if (this.categorie.id) {
      this.edit();
    } else {
      this.create();
    }
  }


  //Creation
  onCreate() {
    this.categorie = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }


  create() {
    let categorieID = localStorage.getItem("categorieID");
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    if (categorieID) {
      let body = {
        "categorieMereID": Number(categorieID),
        "libelleCat": this.categorie?.libelleCat,
        "descriptionCat": this.categorie?.descriptionCat
      }
      this.categorieService.create(body).subscribe(response => {
        if (response.code == 200) {
          if (this.categories.length !== this.recordsPerPage) {
            this.categories.push(response as Categorie);
            this.categories = this.categories.slice();
          }
          this.totalRecords++;
          this.isDialogOpInProgress = false;
          this.showDialog = false;
          this.showMessage({ severity: 'success', summary: response.message?.toString() });
          window.location.reload()
        }
        else {
          this.isDialogOpInProgress = false;
          this.showDialog = false;
          this.showMessage({ severity: 'echec', summary: response.message?.toString() });

        }

      }, error => this.handleError(error));

    }

  }


  // Edit
  onEdit(selection: any) {
    console.log("selection" + selection);
    this.categorie = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.categorie.categorieMereID = (this.categorie.categorieMere?.id != null) ? Number(this.categorie.categorieMere?.id) : Number(localStorage.getItem("categorieID"))
    this.categorieService.create(this.categorie).subscribe(response => {
      if (response.code == 200) {
        let cat = response as Categorie
        let index = this.categories.findIndex(categorie => categorie.id === cat.id);
        this.categories[index] = cat;
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'success', summary: response.message?.toString() });
        window.location.reload()
      }
      else {
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'echec', summary: response.message?.toString() });

      }
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.categorie.id;
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
    this.categorieService.delete(selection.id).subscribe(() => {
      this.categories = this.categories.filter(categorie => categorie.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Catégorie supprimée avec succès' });
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


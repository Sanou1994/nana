import { Logiciel } from './../../../models/logiciel';
import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie/categorie.service';

@Component({
  selector: 'app-logic-list',
  templateUrl: './logic-list.component.html',
  styleUrls: ['./logic-list.component.css']
})
export class LogicListComponent implements OnInit {

  title: string = "SILL";
  ge: number = 25;
  verify: boolean = false;
  nom: string[] = ["gildas", "monsieur"]
  ages: number[] = [25, 30, 25]
  bol: any[] = [25, 30, 40, "bonjour"]
  logiciels!: Logiciel[]
  logiciel: Logiciel = {};
  categories!: any;
  isDisplayModal: boolean = false;
  modalLog: Logiciel | undefined

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
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

  constructor(private categorieService: CategorieService) {
    this.load();
  }

  ngOnInit(): void {

  }
  handleDisplayLogicielModal(logiciel: Logiciel) {
    console.log("======================logiciel")
    console.log(logiciel)
    if (logiciel) {
      this.isDisplayModal = true
      this.modalLog = logiciel
    }
  }
  handleCloseModal() {
    this.isDisplayModal = false
    this.modalLog = undefined
  }

  load(event?: LazyLoadEvent) {
    //this.isLoading = true;
    this.categorieService.getAll(event).subscribe(response => {
      //this.isLoading = false;
      this.categories = response.result as Categorie[];
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApplicationService } from '../../../services/application/apllication.service';
import { Logiciel } from 'src/app/models/logiciel';
import { LazyLoadEvent } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Categorie } from 'src/app/models/categorie';

@Component({
  selector: 'app-logiciel',
  templateUrl: './logiciel.component.html',
  styleUrls: ['./logiciel.component.css']
})
export class LogicielComponent implements OnInit {



  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  logiciels!: Logiciel[];
  logiciel: Logiciel = {};
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  message: any;
  dialogErrorMessage: any;
  categories!: Categorie[];
  searchLogiciel: any;

  constructor(private applicationService: ApplicationService,) { }

  ngOnInit(): void {
    this.load();
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

}

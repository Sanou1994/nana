
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { VersionService } from '../../../services/version/version.service';
import { Version } from 'src/app/models/version';
import { Router } from '@angular/router';
import { LogicielService } from 'src/app/services/logiciel/logiciel.service';
import { Logiciel } from 'src/app/models/logiciel';
import { UploadFileService } from 'src/app/services/uploadFile/upload-file.service';
import { FileDTO } from 'src/app/models/file';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  versions!: Version[]
  version: Version = {};
  logiciels!: Logiciel[];
  selectedLogiciel!: Logiciel;
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
  currentFile!: File;
  dtoFile: FileDTO = {};

  constructor(private versionService: VersionService,
    private logicielService: LogicielService,
    private uploadFileService: UploadFileService,
    private confirmationService: ConfirmationService,

    private router: Router) { }
  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);

  }
  ngOnInit(): void {
    this.load();
    this.loadLogiciel();

  }

  load() {
    this.isLoading = true;
    this.versionService.getAll().subscribe(response => {
      this.isLoading = false;
      this.versions = response.result as Version[];
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }


  loadLogiciel() {
    this.isLoading = true;
    this.logicielService.getAll().subscribe(response => {
      this.isLoading = false;
      this.logiciels = response.result as Logiciel[];
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
    if (this.version.id) {
      this.edit();
    } else {
      this.create();
    }
  }


  //Creation
  onCreate() {
    this.version = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }


  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.version.logicielID = this.version.logiciel?.id
    this.uploadFileService.createFileVersion(this.currentFile).subscribe(response => {
      if (response.code == 200) {
        let dtoVserion = response.result as FileDTO
        this.version.logoVer = dtoVserion.logoVer;
        this.version.localUrl = dtoVserion.localUrl;
        this.dtoFile = dtoVserion
        this.versionService.create(this.version).subscribe(responseVersion => {
          if (responseVersion.code == 200) {
            if (this.versions.length !== this.recordsPerPage) {
              this.versions.push(responseVersion.result as Version);
              this.versions = this.versions.slice();
            }
            this.totalRecords++;
            this.isDialogOpInProgress = false;
            this.showDialog = false;
            this.showMessage({ severity: 'success', summary: responseVersion.message?.toString() });

          }
          else {
            this.uploadFileService.delete(this.dtoFile).subscribe(z => {

              if (z.code != 200) {

                this.isDialogOpInProgress = false;
                this.showDialog = false;
                this.showMessage({ severity: 'echec', summary: response.message?.toString() });

              }

            }
            )

            this.isDialogOpInProgress = false;
            this.showDialog = false;
            this.showMessage({ severity: 'echec', summary: responseVersion.message?.toString() });

          }



        }, error => this.handleError(error));


      }
      else {
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'echec', summary: response.message?.toString() });

      }
    }, error => this.handleError(error)

    )
  }


  // Edit
  onEdit(selection: any) {
    console.log(selection);
    this.version = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.versionService.create(this.version).subscribe(response => {
      let version = response.result as Version;
      let index = this.versions.findIndex(version => version.id === version.id);
      this.versions[index] = version;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'version modifié avec succès' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.version.id;
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
    this.versionService.delete(selection.id).subscribe(() => {
      this.versions = this.versions.filter(version => version.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Version supprimé avec succès' });
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

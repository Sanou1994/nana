import { Component, OnInit } from '@angular/core';
import { Logiciel, LogicielDataFront } from './../../../models/logiciel';
import { Version } from './../../../models/version';
import { environment } from 'src/environments/environment';
import { Categorie } from 'src/app/models/categorie';
import { LogicielService } from 'src/app/services/logiciel/logiciel.service';
import { CategorieService } from 'src/app/services/categorie/categorie.service';

import { AuthService } from 'src/app/services/auth/auth.service';
import { VersionService } from 'src/app/services/version/version.service';
import { UploadFileService } from 'src/app/services/uploadFile/upload-file.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-categorie-log',
  templateUrl: './categorie-log.component.html',
  styleUrls: ['./categorie-log.component.css']
})
export class CategorieLogComponent implements OnInit {

  logiciells: any[] = [];
  logiciels: any[] = [];
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  logiciel: Logiciel = {};
  isLoading!: boolean;
  message: any;
  logicielPerPage: number = 12;
  public selectedpage = 1;
  searchLogiciel: any;
  image!: SafeUrl;
  searchCategorie: any;
  categories: Categorie[] = [];
  sousCategories: Categorie[] = [];
  IdCategorie!: number;
  PageNumbers: number[] = []
  constructor(private logicielService: LogicielService,
    private authService: AuthService,
    private categorieService: CategorieService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private fileService: UploadFileService,
    private versionService: VersionService) { }

  ngOnInit(): void {
    this.authService.initLocastorage();
    let pageIndex = (this.selectedpage - 1) * this.logicielPerPage;
    this.loadLogiciel(pageIndex, this.logicielPerPage);
    this.load();
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {

    });
  }

  generateSafeImageUrl(imgBase64: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imgBase64);
  }
  load(event?: LazyLoadEvent) {

    this.categorieService.getAll(event).subscribe(response => {
      if (response.code == 200) {
        this.categories = response.result as Categorie[];
      }

    }, error => {
      this.message = { severity: 'error', summary: error.error };
    });
  }
  loadSousCategorie(event: Event) {
    const newSize = (event.target as HTMLInputElement).value
    this.categorieService.getSouscategorieByLibelle(newSize).subscribe(response => {
      if (response.code == 200) {
        this.sousCategories = response.result as Categorie[];
      }

    }, error => {
      this.message = { severity: 'error', summary: error.error };
    });
  }

  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value
    this.logicielPerPage = Number(newSize);
    this.changePage(1);
  }


  suivant() {
    this.selectedpage = (this.selectedpage < this.PageNumbers.length) ? this.selectedpage + 1 : 1;
    this.SlicedLogiciel();
  }
  precedant() {
    this.selectedpage = (this.selectedpage > 1) ? this.selectedpage - 1 : 1;
    this.SlicedLogiciel();
  }

  changePage(page: any) {
    this.selectedpage = page;
    this.SlicedLogiciel();
  }
  SlicedLogiciel() {
    let pageIndex = (this.selectedpage - 1) * this.logicielPerPage;
    let endIndes = (this.selectedpage - 1) * this.logicielPerPage + this.logicielPerPage;
    this.logiciells = [];
    this.loadLogiciel(pageIndex, endIndes);

  }

  loadLogiciel(pageIndex: number, endIndes: number) {
    this.logicielService.getAll().subscribe(p => {
      if (p.code == 200) {
        this.logiciels = p.result as Logiciel[]

        // PAGINATION TABLE
        this.PageNumbers = Array(Math.ceil(this.logiciels.length / this.logicielPerPage))
          .fill(0).map((x, i) => i + 1);

        this.logiciels.slice(pageIndex, endIndes).forEach(p => {
          this.versionService.getAll().subscribe(n => {

            if (n.code == 200) {
              let versions = n.result as Version[]
              let myVersionsListes = versions.filter(e => e.logicielID == p.id);
              let versionLast = myVersionsListes[myVersionsListes.length - 1] as Version
              let logicielDataFront: LogicielDataFront = {}
              logicielDataFront.libelleLog = p.libelleLog,
                logicielDataFront.descriptionLog = p.descriptionLog,
                logicielDataFront.communauteUrlLog = "http://" + versionLast.lienTelechVer,
                logicielDataFront.versionlog = versionLast.numeroVer,
                logicielDataFront.editeurlog = p.editeur.libelleEdi,
                logicielDataFront.type = p.libelleLog,
                logicielDataFront.categorie = p.categorie
              this.fileService.getFileVersion(versionLast.logoVer as String).subscribe(p => {
                let doto = p as String
                logicielDataFront.imagelog = 'data:image/jpeg;base64,' + doto;

              }

              )
              this.logiciells.push(logicielDataFront)

            }
          }
          )

        }
        )

      }
    }
    )
  }

}





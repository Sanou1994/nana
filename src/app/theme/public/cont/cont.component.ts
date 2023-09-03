import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { Logiciel } from 'src/app/models/logiciel';
import { ApplicationService } from 'src/app/services/application/apllication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cont',
  templateUrl: './cont.component.html',
  styleUrls: ['./cont.component.css']
})
export class ContComponent implements OnInit {
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  logiciels!: Logiciel[];
  logiciel: Logiciel = {};
  isLoading!: boolean;
  message: any;
  logicielPerPage: number = 1;
  public selectedpage = 1;
  constructor(private applicationService: ApplicationService,) { }

  ngOnInit(): void {
    let pageIndex = (this.selectedpage - 1) * this.logicielPerPage;
    this.logiciels = this.logiciels.slice(pageIndex, this.logicielPerPage)
  }
  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.applicationService.getAll().subscribe(response => {
      this.isLoading = false;
      this.logiciels = response.result;
      console.log(this.logiciels);
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  changePageSize(event: Event) {
  }
  get PageNumbers(): Number[] {
    return Array(Math.ceil(this.logiciels.length / this.logicielPerPage))
      .fill(0).map((x, i) => i + 1);
  }

}

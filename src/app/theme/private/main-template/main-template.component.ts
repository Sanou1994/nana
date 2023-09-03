import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.css']
})
export class MainTemplateComponent implements OnInit {

  constructor(private router : Router) { }

  dashboard(){
    this.router.navigate(['/admin/dashboard']);
  }

  category(){
    this.router.navigate(['/admin/categorie']);
  }

  editeur(){
    this.router.navigate(['/admin/editeur']);
  }

  logiciel(){
    this.router.navigate(['/admin/logiciel']);
  }

  compatibiliteOS(){
    this.router.navigate(['/admin/compatibilite-os']);
  }

  utiliteLogiciel(){
    this.router.navigate(['/admin/utilite-logiciel']);
  }
  utilisateur(){
    this.router.navigate(['/admin/utilisateur']);
  }

  utilisateurProfil(){  
    this.router.navigate(['/admin/profil-utilisateur']);
  }

  privilege(){  
    this.router.navigate(['/admin/privilege']);
  }

  version(){
    this.router.navigate(['/admin/version']);

  }

login(){
    this.router.navigate(['/login']);

  }

  ngOnInit(): void {
  }

}

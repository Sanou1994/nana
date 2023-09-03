import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logiciel } from './../../../models/logiciel';
@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
 

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  login(){
    this.router.navigate(['/login']);
  }
  logiciel(){
    this.router.navigate(['/logiciels']);
  }
  accueil(){
    this.router.navigate(['/accueil']);
  }
}

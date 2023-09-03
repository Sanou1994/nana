import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  erreur: number = 0;
  messageError: string = "aaa";
  user = new User();


  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin() {
    this.authService.initLocastorage()
    this.authService.login(this.user).subscribe(p => {
      if (p.code == 200) {
        this.erreur = 0;
        this.authService.createLocalStorage(p.result.id, p.result.role, p.result.token)
        this.router.navigate(['/admin']);
      }
      else {
        this.erreur = 1;
        this.messageError = p.message;
      }
    })

  }
  logiciel() {
    this.router.navigate(['logiciels']);
  }

  login() {
    this.router.navigate(['login']);

  }
  categorie() {
    this.router.navigate(['accueil']);

  }

}
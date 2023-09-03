import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { DashboardComponent } from './theme/private/dashboard/dashboard.component';
import { HomeComponent } from './components/public/home/home.component';
import { MainTemplateComponent } from './theme/private/main-template/main-template.component';
import { LogicielComponent } from './components/public/logiciel/logiciel.component';
import { CategorieComponent } from './theme/private/categorie/categorie.component';
import { ApplicationComponent } from './theme/private/application/application.component';
import { SousCategorieComponent } from './theme/private/sous-categorie/sous-categorie.component';
import { EditeurComponent } from './theme/private/editeur/editeur.component';
import { CompatibiliteOsComponent } from './theme/private/compatibilite-os/compatibilite-os.component';
import { UtiliteLogicielComponent } from './theme/private/butTelechargement/butTelechargement.component';
import{UtilisateurComponent} from './theme/private/utilisateur/utilisateur.component';
import{ProfilUtilisateurComponent} from './theme/private/profil-utilisateur/profil-utilisateur.component';
import{PrivilegeComponent} from './theme/private/privilege/privilege.component';
import { VersionComponent } from './theme/private/version/version.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'/logiciels',pathMatch:'full'},
  { path:'accueil', component: HomeComponent},
  { path:'logiciels', component: LogicielComponent},
  { path:'login', component: LoginComponent},
  { path:'admin', component: MainTemplateComponent,canActivate:[AuthGuard],
      children : [
        { path:'dashboard', component: DashboardComponent},
        { path:'categorie', component: CategorieComponent},
        { path:'logiciel', component: ApplicationComponent},
        { path:'sous-categorie', component: SousCategorieComponent},
        { path:'editeur', component: EditeurComponent},
        { path:'compatibilite-os', component: CompatibiliteOsComponent},
        { path:'utilite-logiciel', component: UtiliteLogicielComponent},
        { path:'utilisateur', component: UtilisateurComponent},
        { path:'profil-utilisateur', component: ProfilUtilisateurComponent},
        { path:'privilege', component:PrivilegeComponent},
        { path:'version', component:VersionComponent},
      ] 
  },
  { path: "**", redirectTo: '/logiciels' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

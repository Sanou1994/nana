import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './theme/private/dashboard/dashboard.component';
import { LoginComponent } from './components/public/login/login.component';
import { MainTemplateComponent } from './theme/private/main-template/main-template.component';
import { LogicielComponent } from './components/public/logiciel/logiciel.component';
import { MenuComponent } from './theme/public/menu/menu.component';
import { FooterComponent } from './theme/public/footer/footer.component';
import { HomeComponent } from './components/public/home/home.component';
import { CategorieComponent } from './theme/private/categorie/categorie.component';
import { ApplicationComponent } from './theme/private/application/application.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { AppCommonModule } from './common/app-common.module';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SousCategorieComponent } from './theme/private/sous-categorie/sous-categorie.component';
import { EditeurComponent } from './theme/private/editeur/editeur.component';
import { UtiliteLogicielComponent } from './theme/private/butTelechargement/butTelechargement.component';
import { CompatibiliteOsComponent } from './theme/private/compatibilite-os/compatibilite-os.component';
import { ProfilUtilisateurComponent } from './theme/private/profil-utilisateur/profil-utilisateur.component';
import { UtilisateurComponent } from './theme/private/utilisateur/utilisateur.component';
import { PrivilegeComponent } from './theme/private/privilege/privilege.component';
import { TelechargementComponent } from './theme/private/telechargement/telechargement.component';
import { VersionComponent } from './theme/private/version/version.component';
import { PaginatorModule } from 'primeng/paginator';
import { CarouselComponent } from './theme/public/carousel/carousel.component';
import { ContComponent } from './theme/public/cont/cont.component';
import { LogicComponent } from './theme/public/logic/logic.component';
import { LogicListComponent } from './theme/public/logic-list/logic-list.component';
import { ModalogicielComponent } from './theme/public/modalogiciel/modalogiciel.component';
import { VideoComponent } from './theme/public/video/video.component';
import { SousMenuComponent } from './theme/public/sous-menu/sous-menu.component';
import { TextComponent } from './theme/public/text/text.component';
import { RechercheComponent } from './theme/public/recherche/recherche.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CategorieLogComponent } from './theme/public/categorie-log/categorie-log.component';
import { HttpinterceptorService } from './services/httpinterceptor/httpinterceptor.service';
import { LogicDetailComponent } from './theme/public/logic-detail/logic-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    MainTemplateComponent,
    LogicielComponent,
    MenuComponent,
    FooterComponent,
    CategorieComponent,
    ApplicationComponent,
    SousCategorieComponent,
    EditeurComponent,
    UtiliteLogicielComponent,
    CompatibiliteOsComponent,
    ProfilUtilisateurComponent,
    UtilisateurComponent,
    PrivilegeComponent,
    TelechargementComponent,
    VersionComponent,
    CarouselComponent,
    ContComponent,
    LogicComponent,
    LogicListComponent,
    ModalogicielComponent,
    VideoComponent,
    SousMenuComponent,
    TextComponent,
    RechercheComponent,
    CategorieLogComponent,
    LogicDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CardModule,
    DividerModule,
    MessageModule,
    ProgressSpinnerModule,
    NgxPaginationModule,
    TableModule,
    InputTextModule,
    DialogModule,
    ProgressBarModule,
    ButtonModule,
    DropdownModule,
    InputTextareaModule,
    AppCommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    NgbModule
  ],
  providers: [ConfirmationService, { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

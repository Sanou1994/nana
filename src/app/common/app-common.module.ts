import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { CrudToolbarComponent } from "./crud-toolbar/crud-toolbar.component";
import { PanelHeaderComponent } from "./panel-header/panel-header.component";
import { ActionsToolbalIudComponent } from './actions-toolbal-iud/actions-toolbal-iud.component';

@NgModule({
    declarations: [
        CrudToolbarComponent,
        PanelHeaderComponent,
        ConfirmationComponent,
        ActionsToolbalIudComponent

    ],
    imports: [
        ButtonModule,
        ConfirmDialogModule,
        CommonModule,

    ],
    exports: [
        CrudToolbarComponent,
        PanelHeaderComponent,
        ConfirmationComponent,
        ActionsToolbalIudComponent

    ]
})
export class AppCommonModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TranslateModule
    ]
})
export class SharedModule { }
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TranslateModule.forChild()
    ],
    exports: [
        CommonModule
    ]
})
export class ComponentsModule { }
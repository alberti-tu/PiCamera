import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
    declarations: [
        SideMenuComponent,
        ToolbarComponent
    ],
    exports: [
        SideMenuComponent,
        ToolbarComponent
    ],
    imports: [ SharedModule ]
})
export class ComponentsModule { }
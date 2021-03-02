import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from "src/app/components/components.module";
import { LoginComponent } from "./login.component";

const routes: Routes = [
    { path: '', component: LoginComponent }
];

@NgModule({
    imports: [
        ComponentsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {}
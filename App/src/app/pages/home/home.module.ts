import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from "src/app/components/components.module";
import { HomeComponent } from "./home.component";

const routes: Routes = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [
        ComponentsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ HomeComponent ]
})
export class HomeModule {}
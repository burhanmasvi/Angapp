import { NgModule } from "@angular/core";
import { LoadingSpinnersComponent } from "./loading-spinners/loading-spinners.component";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        LoadingSpinnersComponent,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        LoadingSpinnersComponent,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule{

}
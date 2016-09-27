import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TagsInputItem } from "./lib/ng2-tagsinput-item";
import { Ng2TagsInput } from "./lib/ng2-tagsinput";

@NgModule({
    declarations: [
        Ng2TagsInputItem,
        Ng2TagsInput],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule
        ]
})

export class Ng2TagsInputModule {}
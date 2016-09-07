import {NgModule} from '@angular/core';
import {Ng2TagsInput} from "./lib/ng2-tagsinput";
import {Ng2TagsInputItem} from './lib/ng2-tagsinput-item';

@NgModule({
    declarations: [Ng2TagsInput,Ng2TagsInputItem],
    exports: [Ng2TagsInput,Ng2TagsInputItem]
})
export class Ng2TagsInputModule {}

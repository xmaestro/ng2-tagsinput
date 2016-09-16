import { EventEmitter } from '@angular/core';
export declare class Ng2TagsInputItem {
    selected: boolean;
    text: string;
    index: number;
    tagRemoved: EventEmitter<number>;
    constructor();
    removeTag(): void;
}

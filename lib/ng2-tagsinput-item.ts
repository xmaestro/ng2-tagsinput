import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tag-input-item',
  template:
  `{{text}}
  <span
  *ngIf="disabled==false"
  class="ng2-tag-input-remove"
  (click)="removeTag()">&times;</span>`,
  styles: [`
    :host {
      display: inline-block;
      background: #ccc;
      padding: 7px;
      border-radius: 90px;
      margin-right: 10px;
    }
    :host.ng2-tag-input-item-selected {
      color: white;
      background: #0d8bff;
    }
    .ng2-tag-input-remove {
      cursor: pointer;
      display: inline-block;
      padding: 0 3px;
    }
  `],
  host: {
    '[class.ng2-tag-input-item-selected]': 'selected'
  }
})
export class Ng2TagsInputItem {
  @Input() selected: boolean;
  @Input() disabled: boolean = false;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  removeTag() {
    this.tagRemoved.emit(this.index);
  }

}

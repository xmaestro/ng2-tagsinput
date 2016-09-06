import {Component, HostBinding, Input, EventEmitter, Output} from '@angular/core';
import {Ng2TagsInputItem} from './ng2-tagsinput-item';

@Component({
  selector: 'tag-input',
  template:
  `<tag-input-item
    [text]="tag"
    [index]="index"
    [selected]="selectedTag === index"
    (tagRemoved)="_removeTag($event)"
    *ngFor="let tag of tagsList; let index = index">
  </tag-input-item>
  <input
    class="ng2-tag-input-field"
    type="text"
    [placeholder]="placeholder"
    [(ngModel)]="inputValue"
    (paste)="inputPaste($event)"
    (keydown)="inputChanged($event)"
    (blur)="inputBlurred($event)"
    (focus)="inputFocused()"
    #tagInputRef>`,
  styles: [`
    :host {
      display: block;
      box-shadow: 0 1px #ccc;
      padding: 5px 0;
    }
    :host.ng2-tag-input-focus {
      box-shadow: 0 2px #0d8bff;
    }
    .ng2-tag-input-field {
      display: inline-block;
      width: auto;
      box-shadow: none;
      border: 0;
    }
  `],
  directives: [Ng2TagsInputItem]
})

export class Ng2TagsInput {

    @Input() placeholder: string = 'Add a tag';
    @Input() model: string[];
    @Input() delimiterCode: string = '188';
    @Input() addOnBlur: boolean = true;
    @Input() addOnEnter: boolean = true;
    @Input() addOnPaste: boolean = true;
    @Input() allowedTagsPattern: RegExp = /.+/;
    @HostBinding('class.ng2-tag-input-focus') isFocussed;

    @Output() tagsChanged:EventEmitter<any> = null;

    @Output() tagsAdded:EventEmitter<any> = null;

    @Output() tagRemoved:EventEmitter<any> = null;

    public tagsList:string[] = [];
    public inputValue:string = '';
    public delimiter:number;
    public selectedTag:number;

    constructor() {
        this.tagsChanged = new EventEmitter<any>();
        this.tagsAdded = new EventEmitter<any>();
        this.tagRemoved = new EventEmitter<any>();

    }

    ngOnInit() {
        if (this.model) this.tagsList = this.model;
        this.tagsChanged.emit(this.tagsList);
        this.delimiter = parseInt(this.delimiterCode);
    }

    inputChanged(event) {
        let key = event.keyCode;
        switch (key) {
            case 8: // Backspace
                this._handleBackspace();
                break;
            case 13: //Enter
                this.addOnEnter && this._addTags([this.inputValue]);
                event.preventDefault();
                break;

            case this.delimiter:
                this._addTags([this.inputValue]);
                event.preventDefault();
                break;

            default:
                this._resetSelected();
                break;
        }
    }

    inputBlurred(event) {
        this.addOnBlur && this._addTags([this.inputValue]);
        this.isFocussed = false;
    }

    inputFocused(event) {
        this.isFocussed = true;
    }

    inputPaste(event) {
        let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
        let pastedString = clipboardData.getData('text/plain');
        let tags = this._splitString(pastedString);
        let tagsToAdd = tags.filter((tag) => this._isTagValid(tag));
        this._addTags(tagsToAdd);
        setTimeout(() => this.inputValue = '', 3000);
    }

    private _splitString(tagString:string) {
        tagString = tagString.trim();
        let tags = tagString.split(String.fromCharCode(this.delimiter));
        return tags.filter((tag) => !!tag);
    }

    private _isTagValid(tagString:string) {
        return this.allowedTagsPattern.test(tagString);
    }

    private _addTags(tags:string[]) {
        let validTags = tags.filter((tag) => this._isTagValid(tag));
        this.tagsList = this.tagsList.concat(validTags);
        this._resetSelected();
        this._resetInput();
        this.tagsAdded.emit(validTags);
        this.tagsChanged.emit(this.tagsList);
    }

    private _removeTag(tagIndexToRemove) {
        this.tagRemoved.emit(this.tagsList[tagIndexToRemove]);
        this.tagsList.splice(tagIndexToRemove, 1);
        this._resetSelected();
        this.tagsChanged.emit(this.tagsList);
    }

    private _handleBackspace() {
        if (!this.inputValue.length && this.tagsList.length) {
            if (!this.selectedTag) {
                this.selectedTag = this.tagsList.length - 1;
            } 
            this._removeTag(this.selectedTag);            
        }
    }

    private _resetSelected() {
        this.selectedTag = null;
    }

    private _resetInput() {
        this.inputValue = '';
    }

}

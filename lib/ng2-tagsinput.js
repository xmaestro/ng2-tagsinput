"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Ng2TagsInput = (function () {
    function Ng2TagsInput() {
        this.placeholder = 'Add a tag';
        this.delimiterCode = '188';
        this.addOnBlur = true;
        this.addOnEnter = true;
        this.addOnPaste = true;
        this.allowedTagsPattern = /.+/;
        this.tagsChanged = null;
        this.tagsAdded = null;
        this.tagRemoved = null;
        this.tagsList = [];
        this.inputValue = '';
        this.tagsChanged = new core_1.EventEmitter();
        this.tagsAdded = new core_1.EventEmitter();
        this.tagRemoved = new core_1.EventEmitter();
    }
    Ng2TagsInput.prototype.ngOnInit = function () {
        if (this.model)
            this.tagsList = this.model;
        this.tagsChanged.emit(this.tagsList);
        this.delimiter = parseInt(this.delimiterCode);
    };
    Ng2TagsInput.prototype.inputChanged = function (event) {
        var key = event.keyCode;
        switch (key) {
            case 8:
                this._handleBackspace();
                break;
            case 13:
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
    };
    Ng2TagsInput.prototype.inputBlurred = function (event) {
        this.addOnBlur && this._addTags([this.inputValue]);
        this.isFocussed = false;
    };
    Ng2TagsInput.prototype.inputFocused = function (event) {
        this.isFocussed = true;
    };
    Ng2TagsInput.prototype.inputPaste = function (event) {
        var _this = this;
        var clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
        var pastedString = clipboardData.getData('text/plain');
        var tags = this._splitString(pastedString);
        var tagsToAdd = tags.filter(function (tag) { return _this._isTagValid(tag); });
        this._addTags(tagsToAdd);
        setTimeout(function () { return _this.inputValue = ''; }, 3000);
    };
    Ng2TagsInput.prototype._splitString = function (tagString) {
        tagString = tagString.trim();
        var tags = tagString.split(String.fromCharCode(this.delimiter));
        return tags.filter(function (tag) { return !!tag; });
    };
    Ng2TagsInput.prototype._isTagValid = function (tagString) {
        return this.allowedTagsPattern.test(tagString);
    };
    Ng2TagsInput.prototype._addTags = function (tags) {
        var _this = this;
        var validTags = tags.filter(function (tag) { return _this._isTagValid(tag); });
        this.tagsList = this.tagsList.concat(validTags);
        this._resetSelected();
        this._resetInput();
        this.tagsAdded.emit(validTags);
        this.tagsChanged.emit(this.tagsList);
    };
    Ng2TagsInput.prototype._removeTag = function (tagIndexToRemove) {
        this.tagRemoved.emit(this.tagsList[tagIndexToRemove]);
        this.tagsList.splice(tagIndexToRemove, 1);
        this._resetSelected();
        this.tagsChanged.emit(this.tagsList);
    };
    Ng2TagsInput.prototype._handleBackspace = function () {
        if (!this.inputValue.length && this.tagsList.length) {
            if (!this.selectedTag) {
                this.selectedTag = this.tagsList.length - 1;
            }
            this._removeTag(this.selectedTag);
        }
    };
    Ng2TagsInput.prototype._resetSelected = function () {
        this.selectedTag = null;
    };
    Ng2TagsInput.prototype._resetInput = function () {
        this.inputValue = '';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Ng2TagsInput.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Ng2TagsInput.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Ng2TagsInput.prototype, "delimiterCode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Ng2TagsInput.prototype, "addOnBlur", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Ng2TagsInput.prototype, "addOnEnter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Ng2TagsInput.prototype, "addOnPaste", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', RegExp)
    ], Ng2TagsInput.prototype, "allowedTagsPattern", void 0);
    __decorate([
        core_1.HostBinding('class.ng2-tag-input-focus'), 
        __metadata('design:type', Object)
    ], Ng2TagsInput.prototype, "isFocussed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Ng2TagsInput.prototype, "tagsChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Ng2TagsInput.prototype, "tagsAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Ng2TagsInput.prototype, "tagRemoved", void 0);
    Ng2TagsInput = __decorate([
        core_1.Component({
            selector: 'tag-input',
            template: "<tag-input-item\n    [text]=\"tag\"\n    [index]=\"index\"\n    [selected]=\"selectedTag === index\"\n    (tagRemoved)=\"_removeTag($event)\"\n    *ngFor=\"let tag of tagsList; let index = index\">\n  </tag-input-item>\n  <input\n    class=\"ng2-tag-input-field\"\n    type=\"text\"\n    [placeholder]=\"placeholder\"\n    [(ngModel)]=\"inputValue\"\n    (paste)=\"inputPaste($event)\"\n    (keydown)=\"inputChanged($event)\"\n    (blur)=\"inputBlurred($event)\"\n    (focus)=\"inputFocused()\"\n    #tagInputRef>",
            styles: ["\n    :host {\n      display: block;\n      box-shadow: 0 1px #ccc;\n      padding: 5px 0;\n    }\n    :host.ng2-tag-input-focus {\n      box-shadow: 0 2px #0d8bff;\n    }\n    .ng2-tag-input-field {\n      display: inline-block;\n      width: auto;\n      box-shadow: none;\n      border: 0;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2TagsInput);
    return Ng2TagsInput;
}());
exports.Ng2TagsInput = Ng2TagsInput;

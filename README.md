# Angular 2 : Typescript component for Tags Input

An improved version of [angular2-tag-input](https://github.com/rosslavery/angular2-tag-input)

Installation
--------------------------------------

Install it from npm:

```bash
npm install ng2-tagsinput
```

Usage
--------------------------------------

### SystemJS config

```js
System.config({
    ...
    map: {
      ...
      'ng2-tagsinput': 'node_modules/ng2-tagsinput',
      ...
    }
    ...
});
```

### Module

```typescript
import {Ng2TagsInputModule} from 'ng2-tagsinput/ng2-tagsinput';
```

```typescript
 ...
 @NgModule({
   imports: [...,Ng2TagsInputModule]
   })
  ...
```

### View

Use in template like below

```html
<tag-input
placeholder="Add tags ..."
[model]="tagsArray"
(tagsChanged)="onTagsChange($event)"
(tagsAdded)="onTagsAdded($event)"
(tagRemoved)="onTagRemoved($event)"
>
```

Where **model** is the array of elements which will have the resulting tags list. **tagsChanged** is fired whenever tags list changes i.e. tags are added or removed.

## Inputs

- `model` : `string[]` - Model you want the tags list to bind to.
- `placeholder` : `string` - **Default**: ``'Add a tag'`` - Placeholder for the `<input>` tag.
- `delimiterCode` : `Array<number>` - **Default**: ``'[188]'`` - Array of ASCII keycodes to split tags on. Defaults to comma.
- `addOnBlur` : `boolean` - **Default**: `true` - Whether to attempt to add a tag when the input loses focus.
- `addOnEnter` : `boolean` - **Default**: `true` - Whether to attempt to add a tag when the user presses enter.
- `addOnPaste` : `boolean` - **Default**: `true` - Whether to attempt to add a tags when the user pastes their clipboard contents.
- `allowedTagsPattern` : `RegExp` - **Default**: `/.+/` - RegExp that must match for a tag to be added.

## Outputs(Events)

- `tagsChanged` : `string[]` - Fires when tags list is changed in any way.
- `tagsAdded` : `string[]` - Fires when tags are added.
- `tagRemoved` : `string[]` - Fires when tag is removed.

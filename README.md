# ng-suspense

Set of directives for work with async data sources.

Gives ability to handle `loading`, `error` and `resolved` states of Observbale or Promise.

## Instalation

    npm install ng-suspense --save

## Usage

### Import the ng-suspnse module

```TypeScript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSuspenseModule } from 'ng-suspense';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgSuspenseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### Use directive inside component template to provide different templates for different states

```html
<h1>Posts</h1>
<div [ngSuspense]="posts$">
  <div *ngSuspenseError="let error" class="error">Unable to load posts</div>
  <div *ngSuspensePlaceholder="500">Loading...</div>
  <ng-container *ngSuspenseSuccess="let posts">
    <div *ngFor="let post of posts">{{post.title}}</div>
  </ng-container>
</div>
```

## NgSuspense

A structural directive which adds or removes templates when provided Observable|Promise changes its state.

### Selectors

[ngSuspense]

### Properties

| Property                                               | Descritpion |
| ------------------------------------------------------ | ----------- |
| @Input() ngSuspense: Observable\<any\>\|Promise\<any\> |             |

### Description

The [ngSuspense] directive on a container specifies an Observable or Promise to watch on. Whenever state of provided object changes сoresponding template will be rendered.

- If object changes state to `error` a view with the ngSuspenseError directive is rendered
- If object emmits any value a view with the ngSuspenseSuccess directive is rendered
- If no value emmited a view with the ngSuspensePlaceholder directive is rendered

## NgSuspensePlaceholder

Provides a template which should be rendered while Observable or Promise object of enclosing NgSuspense have not produced any value.

### Properties

| Property                                                      | Description                                                                                                                        |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| @Input() ngSuspensePlaceholder?: number \| TemplateRef\<any\> | If only number provided this number will be used as delay (ms). If TemplateRef provided, this template will be used instead of vew |
| @Input() ngSuspensePlaceholderDelay?: number                  | Delay in ms                                                                                                                        |
| @Input() ngSuspensePlaceholderTemplate?: TemplateRef\<any\>   | Template to be used                                                                                                                |

### Description

Withing a [ngSuspense] conainer `ngSuspensePlaceholder` directive provides a template and delay in milliseconds when this template will be showed.

## NgSuspenseError

Provides a template which should be rendered when Observable\|Promise in enclosing [ngSuspense] change its state to error.

### Properties

| Property                                      | Description         |
| --------------------------------------------- | ------------------- |
| @Input() ngSuspenseError?: TemplateRef\<any\> | Altenative template |

### Using non-inlined template

Usually error template inlined with ngSuspenseError directive, but it can be changed using binding (just like `then` and `else` in ngIf). Because it is binded the template reference can be changed at runtime.

### Storing error object in a value

A common pattern is to show different templates for different error types. NgSuspenseError directive provides `{ $imlicit: error }` as a context for rendered template.

```html
<ng-container *ngSuspenseError="let error">
  <ng-container [ngSwitch]="error.status">
    <div *ngSwitchCase="404">Post not found</div>
    <div *ngSwitchCase="401">Not authenticated</div>
    <div *ngSwitchВefault>Uncnown error</div>
  </ng-container>
</ng-container>
```

## NgSuspenseSuccess

Provides a template for resolved value

### Properties

| Property                                        | Description         |
| ----------------------------------------------- | ------------------- |
| @Input() ngSuspenseSuccess?: TemplateRef\<any\> | Altenative template |

### Using non-inline templates

Sometimes you need to provide template in runtime. In this case you can provide it as an inpunt for ngSuspenseSuccess

### Store result in a value

ngSuspenseSuccess provides `{ $implicit: responseData }` as a context for the templatte.

```html
<ng-container [ngSuspense]="posts$">
  <div *ngSuspenseSuccess="let posts"><div *ngFor="let post of posts">{{post.title}}</div></div>
</ng-container>
```

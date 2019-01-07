# ng-suspense

## Instalation

    npm install ng-suspense --save

## Usage

### Import the module and add it to your imports section in your SharedModule

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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './page/index/index.component';
import { NavFooterComponent } from './page/nav-footer/nav-footer.component';
import { NavHeaderComponent } from './page/nav-header/nav-header.component';
import { BackendService } from './service/backend/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UnEntityComponent } from './page/un-entity/un-entity.component';
import { AppHeaderComponent } from './page/app-header/app-header.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavHeaderComponent,
    NavFooterComponent,
    UnEntityComponent,
    AppHeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}

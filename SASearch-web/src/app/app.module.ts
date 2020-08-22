import { InterceptorService } from './service/interceptor.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TRANSLATIONS } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlaskService } from './service/flask.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgTwitterTimelineModule } from 'ng-twitter-timeline';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ResultsComponent } from './component/results/results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { SearchComponent } from './component/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ResultsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgTwitterTimelineModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dzoq2eys2' }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
    }),
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    FlaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }

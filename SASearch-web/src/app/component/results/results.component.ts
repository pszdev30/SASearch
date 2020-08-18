import { HttpClient } from '@angular/common/http';
import { TransferService } from './../../service/transfer.service';
import { Component, OnInit, QueryList } from '@angular/core';
import { FlaskService } from 'src/app/service/flask.service';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  query: string;
  publicId: string;
  publicIds: any[] = [];
  searchClicked: boolean = false;
  randomClicked: boolean = false;

  constructor(private flaskService: FlaskService, private cloudinary: Cloudinary, private transfer: TransferService, private http: HttpClient, private ngxXml2jsonService: NgxXml2jsonService) { }

  ngOnInit(): void {
    this.transfer.getRandomObservable$.subscribe((resp) => {
      this.flaskService.getRandom().subscribe((resp: string) => {
        console.log(resp);
        this.publicId = resp;
        this.randomClicked = true;
      });
      this.reset();
    });

    this.transfer.searchObservable$.subscribe(() => {
      this.reset()
      this.query = this.transfer.getQuery()
      this.flaskService.search(this.query).subscribe((resp) => {
        let respLength: number = Object.keys(resp).length
        for (let i = 0; i < respLength; i++) {
          this.publicIds.push(resp[i]);
          console.log(this.publicIds[i])
        }
        this.searchClicked = true;
        this.transfer.resetQuery();
      })
    })

    // this.transfer.getRandomObservable$.subscribe((resp) => {
    //   this.flaskService.search(resp).subscribe((resp: any) => {
    //     let respLength: number = Object.keys(resp).length
    //     for (let i = 0; i < respLength; i++) {
    //       this.publicIds.push(resp[i]);
    //       console.log(this.publicIds[i])
    //     }
    //     this.searchClicked = true;
    //   });
    //   this.reset();
    // })



  }



  search(query: string) {
    this.flaskService.search(query).subscribe((resp: any) => {
      let respLength: number = Object.keys(resp).length
      for (let i = 0; i < respLength; i++) {
        this.publicIds.push(resp[i]);
        console.log(this.publicIds[i])
      }
      this.searchClicked = true;
    });
    this.reset();
  }

  getRandom() {
    this.flaskService.getRandom().subscribe((resp: string) => {
      console.log(resp);
      this.publicId = resp;
      this.randomClicked = true;
    });
    this.reset();
  }


  reset() {
    this.publicId = '';
    this.publicIds = [];
    this.searchClicked = false;
    this.randomClicked = false;
  }

}
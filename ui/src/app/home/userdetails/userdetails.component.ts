import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SharedService } from '../../shared.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit, OnChanges {

  @Input()
  readUserInput
  userDetailArr = []
  constructor(private _shared: SharedService,
              private _http: HttpClient,
              private _router: Router) { }

  ngOnInit() {
    /*this.userDetailArr = [
      {id:'1',
      detailimag:'../../../assets/person.svg',
      detailName:'Ben',
      detailBio:'This is my Bio'
      }
    ]*/
  }
  
  ngOnChanges(){
    this.userDetailArr = this.readUserInput;
    //console.log("userdetail comp", this.userDetailArr);
  }

  navigate(user){
    //console.log(user)
    this._shared.selectEmail=user.email;
    this._router.navigate(['userinfo']);
  }
}

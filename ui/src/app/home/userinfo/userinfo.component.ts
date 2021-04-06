import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  constructor(private _shared: SharedService,
              private _http: HttpClient,
              private _router: Router) {
    if(!this._shared.isSignIn){
      this._router.navigate(['signup'])
    }}

  name: String;
  email: String;
  insta_id: String;
  country: String;
  bio: String;
  user_img: any;

  ngOnInit() {
    let email=this._shared.selectEmail
    console.log(email)
    this._http.get('http://localhost:3000/api/user/'+email,)
    .subscribe((res)=>{
      console.log(res['data']);
      this.name=res['data']['name'];
      this.email=res['data']['email'];
      this.insta_id=res['data']['insta_id'];
      this.country=res['data']['country'];
      this.bio=res['data']['bio'];
      this.user_img=res['data']['user_img'];
    })
  }

}

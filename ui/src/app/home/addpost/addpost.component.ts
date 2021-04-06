import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  constructor(private _http: HttpClient,
              private _shared: SharedService,
              private _router: Router) {
    if(!this._shared.isSignIn){
      this._router.navigate(['signup'])
    }
  }

  ngOnInit(): void {
  }

  post_img;
  postErr: String;
  submitPost(form:NgForm){
    //if(form.value['locName']&&form.value['locDesc'])
    //req payload
    let loc_name = form.value['locName'];
    let loc_desc = form.value['locDesc'];
    let loc_img = this.post_img;
    let email = this._shared.signInEmail;

    // error req obj
    //loc_img = formData;
    let obj = {
      loc_name: loc_name,
      loc_desc: loc_desc,
      email: email
    }

    //request payload in formdata not object

    let formData = new FormData();

    formData.append('loc_img',loc_img);
    formData.append('loc_name',loc_name);
    formData.append('loc_desc',loc_desc);
    formData.append('email',email.toString());

    this._http.post('http://localhost:3000/api/post/addpost',formData)
    .subscribe((res)=>{
      if(res['status']==200){
        this.postErr = null;
        this._router.navigate(['home']);
      }
      else{
        this.postErr = res['data']['message'];
      }
    })
  }

  updateImage(event){
    this.post_img = event.target.files[0];
  }
}

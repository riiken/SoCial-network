import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allPost;
  allUser;
  constructor(private shared: SharedService,
              private router: Router,
              private http: HttpClient) {
    if(!this.isSignIn){
      this.router.navigate(['signup'])
    }
    else{
      //get all the posts
      this.http.get('http://localhost:3000/api/post/')
      .subscribe((res)=>{
        if(res['status']==200){
          console.log(res);
          this.allPost = res['data'];
        }
      })
      this.http.get('http://localhost:3000/api/user/')
      .subscribe((res)=>{
        if(res['status']==200){
          console.log(res);
          this.allUser=res['data'];
        }
      })
    }
  }
  isSignIn = this.shared.isSignIn;
  ngOnInit() {
  }

}

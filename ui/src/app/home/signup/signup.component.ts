import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

//add http service in constructot component class
  constructor(private http: HttpClient,
              private shared: SharedService,
              private router: Router) {
                this.shared.signInEmail="";
                this.shared.isSignIn=false;
                this.shared.clearAuthUser();
              }

  ngOnInit(): void {
  }
  
  name: string;
  email: string;
  password: string;
  insta_id: string;
  country: string;
  bio: string;
  user_img: any;
  fileName: string;
  showFileName: boolean = false;
  signErr: String='';

  signUp(){
    if (this.name && this.email && this.password && this.insta_id && this.country && this.bio){
      //call api
      //prepare request object
      let reqobj = {
        name: this.name,
        email: this.email,
        password: this.password,
        insta_id: this.insta_id,
        country: this.country,
        bio: this.bio,
        user_img: this.user_img
      }
      //observable
      this.http.post('http://localhost:3000/api/auth/signup',reqobj)
      .subscribe((res)=>{
        console.log(res);
        if(res['status']==200){
          this.signErr='';
          this.shared.isSignIn = true;
          this.shared.signInEmail = this.email;
          this.shared.setAuthUser(this.email);
          this.router.navigate(['home']);
        }
        else{
          this.signErr = res['message'];
        }
      })
    }
    else{
      //inform user incomplete credetials
      alert("Enter all the fields!");
    }
  }

  updateImage(event){
    let file = event.target.files[0];
    this.fileName = file.name;
    this.showFileName = true;
    //convert file to Base64 url
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.user_img = reader.result.toString();
    }
  }
  
}
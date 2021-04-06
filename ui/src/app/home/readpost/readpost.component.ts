import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SharedService } from '../../shared.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-readpost',
  templateUrl: './readpost.component.html',
  styleUrls: ['./readpost.component.css']
})
export class ReadpostComponent implements OnInit, OnChanges {

  @Input()
  readPostInput
  readPostArr = []
  constructor(private _shared: SharedService, private _http: HttpClient) { }

  ngOnInit() {
    /*this.readPostArr = [
      {id:'1',
      postimag:'../../../assets/trekking.jpg',
      postTitle:'A Trip to Manali',
      postDesc:'Manali is Amazing..',
      postUser:'Ben',
      postLikes:'255',
      postDislikes:'133'
      }
    ]*/
  }

  ngOnChanges(){
    this.readPostArr = this.readPostInput;
    console.log("readpost component");
    console.log(this.readPostArr);
  }

  addvote(vote:boolean, post_id: any){
    //req obj
    let obj = {
      post_id: post_id,
      email: this._shared.signInEmail,
      vote: vote
    }
    //like or dislike
    this._http.post("http://localhost:3000/api/vote/add", obj)
    .subscribe((res)=>{
      if(res['status']==200){
        //get all post
        this._http.get('http://localhost:3000/api/post/')
        .subscribe((res)=>{
          if(res['status']=200){
            console.log(res);
            this.readPostArr = res['data'];
          }
        })
      }
    })
  }
}
import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CinemaService} from "../services/cinema.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username:string="";
  public password:string="";
  public message:any;
  private isauth:boolean=false;

  constructor(private cinemaService: CinemaService, private router:Router) { }

  ngOnInit(): void {
  }

  public login(){
    this.cinemaService.login(this.username, this.password).subscribe(data=>{
      this.message=data;
      this.isauth=!this.isauth;
      this.router.navigate(["/cinema"]);
    });
  }

}

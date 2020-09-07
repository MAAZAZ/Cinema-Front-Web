import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  public host:string="http://localhost:8080";
  private token:string;

  constructor(private http:HttpClient) {
    this.token= sessionStorage.getItem("token");
    console.log(this.token);
  }

  public getVilles(){
    const headers=new HttpHeaders({Authorization:'Basic '+this.token})
      return this.http.get(this.host+"/villes",{headers});
  }

  public getCinemas(v){
    const headers=new HttpHeaders({Authorization:'Basic '+this.token})
    return this.http.get(v._links.cinemas.href,{headers});
  }

  public getSalles(c){
    const headers=new HttpHeaders({Authorization:'Basic '+this.token})
    return this.http.get(c._links.salles.href,{headers});
  }

  public getProjections(s){
    const headers=new HttpHeaders({Authorization:'Basic '+this.token})
    let url=s._links.projections.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1",{headers})
  }

  public getTicketsPlaces(p){
    const headers=new HttpHeaders({Authorization:'Basic '+this.token})
    let url=p._links.tickets.href.replace("{?projection}","");
    return this.http.get(url+"?projection=t1",{headers});
  }

  public payerTickets(dataForm) {
    const headers=new HttpHeaders({Authorization:'Basic '+this.token})
    //console.log(dataForm);
    return this.http.post(this.host + "/film/payerTickets", dataForm,{headers});
  }

  public login(username:string, password:string){
    let token = btoa(username+':'+ password);
    sessionStorage.setItem("token",token)
    const headers=new HttpHeaders({Authorization:'Basic '+token})
    return this.http.get(this.host,{headers, responseType:'text' as 'json'});
  }

}

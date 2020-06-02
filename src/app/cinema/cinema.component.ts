import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CinemaService} from "../services/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes;
  public cinemas;
  public currentVille;
  public currentCinema;
  public salles;
  public currentProjection;
  public selectedTickets;

  constructor(public cinemaService:CinemaService) { }

  ngOnInit() {
    this.cinemaService.getVilles().subscribe(
      data=>{
        this.villes=data;
      },err=>{
        console.log(err);
      }
    );
  }


  public onGetCinemas(v){
    this.currentVille=v;
    this.salles=undefined;
    this.cinemaService.getCinemas(v).subscribe(
      data=>{
        this.cinemas=data;
      },err=>{
        console.log(err);
      }
    );
  }

  public onGetSalles(c){
    this.currentCinema=c;
    this.cinemaService.getSalles(c).subscribe(
      data=>{
        this.salles=data;
        this.salles._embedded.salles.forEach(salle=>{
          this.cinemaService.getProjections(salle).subscribe(
            data=> {
              salle.projections = data;
            },err=>{
              console.log(err);
            });
        })
      },err=>{
        console.log(err);
      }
    );
  }

  public onGetTicketsPlaces(p) {
    this.currentProjection = p;
    this.cinemaService.getTicketsPlaces(p).subscribe(
      data => {
        this.currentProjection.tickets = data;
        this.selectedTickets=[];

      }, err => {
        console.log(err);
      })
    }

    public onSelectTicket(t){
      if(!t.selected){
        t.selected=true;
        this.selectedTickets.push(t);
      }
      else {
        t.selected=false;
        this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);
      }
    }

    public getTicketClass(t){
      let str="btn ";
      if(t.reserve==true){
        str+="btn-danger ticket"
      }
      else if(t.selected){
        str+="btn-warning ticket"
      }
      else{
        str+="btn-success ticket"
      }
      return str;
    }

    public onPayTickets(dataForm){
      let tickets=[];
      this.selectedTickets.forEach(ticket=>{
        tickets.push(ticket.id)
      },err=>{
        console.log(err);
      })
      dataForm.tickets=tickets;
      //console.log(dataForm);
      this.cinemaService.payerTickets(dataForm).subscribe(
        data => {
          alert("Le(s) ticket(s) réservé(s) avec succès!")
          this.onGetTicketsPlaces(this.currentProjection);
        }, err => {
          console.log(err);
        })
    }

  }

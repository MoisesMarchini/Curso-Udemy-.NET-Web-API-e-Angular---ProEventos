import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public allEventos: any = [];
  showImgs = true;
  widthImg = 150;
  heightImg = 150;
  marginImg = 2;
  private _filterList: string = '';

  public get filterList() {
    return this._filterList;
  }
  public set filterList(value: string) {
    this._filterList = value;
    this.eventos = this.filterList ? this.filterEvents(this.filterList) : this.allEventos;
  }

  filterEvents(filterBy: string): any{
    filterBy = filterBy.toLocaleLowerCase();
    return this.allEventos.filter(
      (evento: {
        local: string;
        dataEvento: string;
        qtdPessoas: string;
        lote: string;
        tema: string;
      }) =>
        evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1||
        evento.dataEvento.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => this.eventos = this.allEventos = response,
      error => console.log(error)
    );
  }

}

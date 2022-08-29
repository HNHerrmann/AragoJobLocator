import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { StatOffersCount} from "../app.component";
import {BackURL} from "../../../urls";
//import {NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit {

  lineChartDataNOffersDay: ChartDataSets[] = [
    { data: [], label: 'Ofertas creadas' },
  ];
  lineChartLabelsNOffersDay: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Nº Ofertas' }
  ]

  listado : StatOffersCount[];
  dataset: number[];
  labels: Label[];

  listadoBar : StatOffersCount[];
  datasetBar: number[];
  labelsBar: Label[];


  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {

    this.labels=[]
    this.dataset=[]
    this.labelsBar=[]
    this.datasetBar=[]

    this.http.get(BackURL + '/stats/offersCreated',{withCredentials: true}).subscribe(
      (resp: any) => {
        console.log(resp);
        console.log(resp.length)
        this.listado = resp;
        console.log(this.listado)
        console.log(this.listado.length)
        let dataindex =0;
        for (let i = 0; i < resp.length; i++) {
          if(i==0){
            this.dataset[dataindex] = this.listado[i].count
            this.labels[dataindex] = this.listado[i]._id
          }
          else {
            if (this.listado[i]._id == this.listado[i - 1]._id) {
              console.log(this.listado[i]._id)
              dataindex=dataindex-1
              this.dataset[dataindex] =  (this.dataset[dataindex]) + this.listado[i].count
            }
            else{
              this.dataset[dataindex] = this.listado[i].count
              this.labels[dataindex] = this.listado[i]._id
            }
          }
          dataindex=dataindex+1
        }
        this.lineChartDataNOffersDay[0].data=this.dataset
        this.lineChartLabelsNOffersDay=this.labels
        console.log(this.dataset)
        console.log(this.labels)
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      });


    this.http.get(BackURL + '/stats/offersFilters',{withCredentials: true}).subscribe(
      (resp: any) => {
        console.log(resp);
        this.listadoBar = resp;
        console.log(resp.length)
        for (let i = 1; i < resp.length; i++) {
          this.datasetBar[i-1] = this.listadoBar[i].count
          this.labelsBar[i-1] = this.listadoBar[i]._id
        }
        this.barChartData[0].data=this.datasetBar
        this.barChartLabels=this.labelsBar
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      });
  }
}

import { Component } from '@angular/core';
import { PieChartApexComponent } from '../../../chart-config/pie-chart-apex/pie-chart-apex.component';

@Component({
  selector: 'app-graph-monthly-target',
  standalone: true,
  imports: [
    PieChartApexComponent
  ],
  templateUrl: './graph-monthly-target.component.html',
  styleUrl: './graph-monthly-target.component.css'
})
export class GraphMonthlyTargetComponent {
  MonthlyTargetChart = {
    series: [60],
    chart: {
      height: 272,
      type: 'radialBar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        /* hollow: {
         margin: 0,
         size: '70%',
         background: '#fff',
         image: undefined,
         imageOffsetX: 0,
         imageOffsetY: 0,
         position: 'front',
       }, */
        hollow: {
          margin: 20,
          size: '65%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 10,
            opacity: 0.1
          }
        },
        track: {
          // background: '#F8F8F8',
          strokeWidth: '100%',
          margin: 0, // margin is in pixels
        },

        dataLabels: {
          show: true,
          value: {
            offsetY: -7,
            // color: '#111',
            fontSize: '20px',
            show: true,
          }
        }
      }
    },
    fill: {
      colors: ['#43DC80'],
    },
    stroke: {
    },
    labels: [''],
  }
}

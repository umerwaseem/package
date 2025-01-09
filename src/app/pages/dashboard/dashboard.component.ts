import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GraphProjectTimelineComponent } from '../../elements/short-cods/dashboard/graph-project-timeline/graph-project-timeline.component';
import { GraphClientComponent } from '../../elements/short-cods/dashboard/graph-client/graph-client.component';
import { GraphMonthlyTargetComponent } from '../../elements/short-cods/dashboard/graph-monthly-target/graph-monthly-target.component';
import { GraphProjectReleasedComponent } from '../../elements/short-cods/dashboard/graph-project-released/graph-project-released.component';
import { DoughnutChartJsComponent } from '../../elements/chart-config/doughnut-chart-js/doughnut-chart-js.component';
import { PieChartApexComponent } from '../../elements/chart-config/pie-chart-apex/pie-chart-apex.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    GraphClientComponent,
    GraphProjectTimelineComponent,
    GraphMonthlyTargetComponent,
    GraphProjectReleasedComponent,
    DoughnutChartJsComponent,
    PieChartApexComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  MonthlyTargetChart = {
    series: [60],
    chart: {
      width:180,
      type: 'radialBar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 50,
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
          strokeWidth: '100%',
          margin: 0,
        },

        dataLabels: {
          show: true,
          value: {
            offsetY: -7,
            fontSize: '16px',
            show: true,
          },
          colors: ['#43DC80'],
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

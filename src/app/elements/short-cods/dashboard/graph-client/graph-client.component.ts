import { Component } from '@angular/core';
import { BarChartApexComponent } from '../../../chart-config/bar-chart-apex/bar-chart-apex.component';

@Component({
  selector: 'app-graph-client',
  standalone: true,
  imports: [
    BarChartApexComponent,
  ],
  templateUrl: './graph-client.component.html',
  styleUrl: './graph-client.component.css'
})
export class GraphClientComponent {
  ClientsChart = {
    series: [{
      name: "Desktops",
      data: [25, 40, 30, 50, 40]
    }],
    chart: {
      height: 270,
      type: 'line',
      zoom: {
        enabled: true
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    colors: ['#43DC80'],
    title: {
      text: undefined,
      align: 'left'
    },
    grid: {
      strokeDashArray: 5,
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#828690',
          fontSize: '14px',
          fontFamily: 'Poppins',
          fontWeight: 100,
        }
      }
    }
  };
}

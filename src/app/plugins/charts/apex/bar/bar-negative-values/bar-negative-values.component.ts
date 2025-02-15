import { Component } from '@angular/core';
import { BarChartApexComponent } from '../../../../../elements/chart-config/bar-chart-apex/bar-chart-apex.component';

@Component({
  selector: 'app-bar-negative-values',
  standalone: true,
  imports: [BarChartApexComponent],
  templateUrl: './bar-negative-values.component.html',
  styleUrl: './bar-negative-values.component.css'
})
export class BarNegativeValuesComponent {
  chartOptions = {
    series: [
      {
        name: "Males",
        data: [
          0.4,
          0.65,
          0.76,
          0.88,
          1.5,
          2.1,
          2.9,
          3.8,
          3.9,
          4.2,
          4,
          4.3,
          4.1,
          4.2,
          4.5,
          3.9,
          3.5,
          3
        ]
      },
      {
        name: "Females",
        data: [
          -0.8,
          -1.05,
          -1.06,
          -1.18,
          -1.4,
          -2.2,
          -2.85,
          -3.7,
          -3.96,
          -4.22,
          -4.3,
          -4.4,
          -4.1,
          -4,
          -4.1,
          -3.4,
          -3.1,
          -2.8
        ]
      }
    ],
    chart: {
      type: "bar",
      height: 440,
      stacked: true,
      toolbar: {
        show: false
      }
    },
    colors: ["var(--primary)", "#787878"],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%"
      }
    },
    stroke: {
      width: 1,
      colors: ["#fff"]
    },
    xaxis: {
      categories: [
        "85+",
        "80-84",
        "75-79",
        "70-74",
        "65-69",
        "60-64",
        "55-59",
        "50-54",
        "45-49",
        "40-44",
        "35-39",
        "30-34",
        "25-29",
        "20-24",
        "15-19",
        "10-14",
        "5-9",
        "0-4"
      ],
      labels: {
        formatter: function (val:any) {
          return Math.abs(Math.round(parseInt(val, 10))) + "%";
        }
      }
    },
    yaxis: {
      min: -5,
      max: 5,
      title: {
        // text: 'Age',
      }
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val:any) {
          return val.toString();
        }
      },
      y: {
        formatter: function (val:any) {
          return Math.abs(val) + "%";
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    legend: {
      show:false
    }
  
  }
}

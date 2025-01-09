import { Component } from '@angular/core';
import { BarChartApexComponent } from '../../../chart-config/bar-chart-apex/bar-chart-apex.component';

@Component({
  selector: 'app-graph-project-timeline',
  standalone: true,
  imports: [
    BarChartApexComponent
  ],
  templateUrl: './graph-project-timeline.component.html',
  styleUrl: './graph-project-timeline.component.css'
})
export class GraphProjectTimelineComponent {
  optionsTimeline = {
    series: [
      {
        name: "New Clients",
        data: [300, 450, 600, 600, 400, 450, 410, 470, 480, 800, 600, 900, 400]
      }
    ],
    chart: {
      type: "bar",
      height: 200,
      stacked: true,
      toolbar: {
        show: false
      },
      sparkline: {
        //enabled: true
      },
      zoom: {
        enabled: true,
      },
      offsetX: 0,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 7,
        columnWidth: "30%",
        endingShape: "rounded",
        startingShape: "rounded",
        colors: {
          backgroundBarColors: ['#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0', '#f0f0f0'],
          backgroundBarOpacity: 1,
          backgroundBarRadius: 5,
        },
      },
      distributed: true
    },
    colors: ['#43DC80'],
    grid: {
      show: false,
    },
    legend: {
      show: false
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      enabled: false,
      colors: ['#000'],
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        bottom: 0,
        opacity: 1
      }
    },
    xaxis: {
      categories: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
      labels: {
        style: {
          colors: '#787878',
          fontSize: '14px',
          fontFamily: 'poppins',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
      crosshairs: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        style: {
          colors: '#3e4954',
          fontSize: '14px',
          fontFamily: 'Poppins',
          fontWeight: 100,
        },
        formatter: function (y: any) {
          return y.toFixed(0) + "k";
        }
      },
    },
    tooltip: {
      x: {
        show: true
      }
    },
    responsive: [{
      breakpoint: 575,
      options: {
        chart: {
          height: 250,
        }
      }
    }]
  }
}

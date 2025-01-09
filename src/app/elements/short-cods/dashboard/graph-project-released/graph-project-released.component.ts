import { Component } from '@angular/core';
import { BarChartApexComponent } from '../../../chart-config/bar-chart-apex/bar-chart-apex.component';

@Component({
  selector: 'app-graph-project-released',
  standalone: true,
  imports: [
    BarChartApexComponent
  ],
  templateUrl: './graph-project-released.component.html',
  styleUrl: './graph-project-released.component.css'
})
export class GraphProjectReleasedComponent {
  widgetChart2 = {
    series: [
      {
        name: 'Net Profit',
        data: [500, 500, 400, 400, 600, 600, 300, 300, 500, 500, 700, 700],
        //radius: 12,
      },
    ],
    chart: {
      type: 'area',
      height: 80,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true
      }
    },
    colors: ['#43DC80'],
    dataLabels: {
      enabled: false,
    },
    markers: {
      shape: "circle",
    },
    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 4,
      curve: 'smooth',
      colors: ['#43DC80'],
    },
    grid: {
      show: false,
      borderColor: '#eee',
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      hover: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0
        }
      }
    },
    xaxis: {
      categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        style: {
          fontSize: '12px',
        }
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          width: 1,
          dashArray: 3
        }
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        }
      }
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 0.0,
      type: 'solid',
      colors: '#FAC7B6'
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: any) {
          return "$" + val + " thousands"
        }
      }
    }
  };
}

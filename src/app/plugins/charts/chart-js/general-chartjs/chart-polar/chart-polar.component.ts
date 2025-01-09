import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-polar',
  standalone: true,
  imports: [],
  templateUrl: './chart-polar.component.html',
  styleUrl: './chart-polar.component.css'
})
export class ChartPolarComponent {
  ngOnInit() {
    const cricleChart = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [{
        label: 'My First Dataset',
        data: [90, 50, 100, 60, 30],
        backgroundColor: [
          '#0e8a74',
          'rgb(54, 162, 235)',
          '#AFEEEE',
          '#43DC80',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    new Chart('polar-chart', {
      type: 'polarArea',
      data: cricleChart,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Polar Area Chart'
          }
        }
      },
    });
  }
}

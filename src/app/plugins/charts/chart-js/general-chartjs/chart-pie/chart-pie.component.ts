import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-pie',
  standalone: true,
  imports: [],
  templateUrl: './chart-pie.component.html',
  styleUrl: './chart-pie.component.css'
})
export class ChartPieComponent {
  ngOnInit() {
    const cricleChart= {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(14, 138, 116, 0.5)',
          '#1eaae7',
          '#43DC80',
        ],
        hoverOffset: 4
      }]
    };
    new Chart('pie-chart', {
      type: 'pie',
      data: cricleChart,
    });
  }
}

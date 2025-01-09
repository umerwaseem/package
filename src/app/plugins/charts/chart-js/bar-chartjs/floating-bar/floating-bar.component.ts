import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-floating-bar',
  standalone: true,
  imports: [],
  templateUrl: './floating-bar.component.html',
  styleUrl: './floating-bar.component.css'
})
export class FloatingBarComponent {
  labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  chartjs_bar = {
    type: 'bar',
    data: {
      labels: this.labels,
      datasets: [
        {
          label: 'Fully Rounded',
          data: [65, -59, -55, 40, 56, -35, 81, -56, -70, 80],
          borderColor: '#1eaae7',
          backgroundColor: '#6acbf4d9',
        },
        {
          label: 'Small Radius',
          data: [ -81, 56, 55, 65, -54, 60, -59, 80, -40, 25],
          borderColor: '#43DC80',
          backgroundColor: '#43DC80',
        },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  }
  all_data: any;
  ngOnInit() {
    this.all_data = this.chartjs_bar;
    new Chart('filotionChart', {
      type: this.all_data.type,
      data: this.all_data.data,
      options: this.all_data.options,
    });
  }
}

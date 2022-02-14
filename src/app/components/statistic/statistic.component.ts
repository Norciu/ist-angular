import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { StatisticService } from './statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  constructor(private statisticService: StatisticService) { }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]>;
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: { display: true },
    }
  };
  public barChartLabels: string[] = [ 'Światłowód', 'GSM', 'Antena radiowa', 'Kabel ethernet', 'Kabel koncentryczny' ];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'>;

  async ngOnInit(): Promise<void> {
    const { result } = await this.getPieChartData();
    const { result: barChart } = await this.statisticService.getBarChartData();

    this.pieChartData = {
      labels: [ 'Podłączeni', 'Możliwe podłączenie', 'Podłączenie niemożliwe' ],
      datasets: [{ data: Object.values(result) }]
    }

    console.log(Object.entries(barChart).map(([ label, value ], index) => ({ data: [ value ], label: this.barChartLabels[index] })))

    this.barChartData = {
      labels: this.barChartLabels,
      datasets: this.datasets(barChart),
    }
  }

  async getPieChartData(): Promise<{ success: boolean, result: unknown }> {
    return this.statisticService.getPieChartData();
  }

  private datasets(data: number[]): { data: number[], label: string }[] {
    const t = Object.values(data);
    const empty = t.map(() => 0);

    return t.map((value, index) => ({ data: t.map((o, i) => i === index ? o : empty[i]), label: this.barChartLabels[index] }));
  }

}

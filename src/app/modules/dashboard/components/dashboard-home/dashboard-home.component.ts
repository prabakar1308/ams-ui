import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { DashboardFacadeService } from '@modules/dashboard/services/dashboard-facade.service';
import { DashboardResponse, TankWiseStatus } from '@modules/dashboard/models/dashboard-response';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // Dataset
  DatasetComponent,
  // Built-in transform (filter, sort)
  TransformComponent,
  LegendComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  // The series option types are defined with the SeriesOption suffix

  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from 'echarts/charts';
import type {
  // The component option types are defined with the ComponentOption suffix
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
import { DashboardService } from '@modules/dashboard/services/dashboard.service';
import { Response } from '@shared/models/response';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

// Create an Option type with only the required components and charts via ComposeOption
type ECOption = ComposeOption<
  | PieSeriesOption
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private unSubscribe = new Subject<void>();
  dashboardData: DashboardResponse[] | null = [];
  tankTypeId = 1;

  constructor(
    private dashboardFacade: DashboardFacadeService,
    private dashboardService: DashboardService,
    private _elementRef: ElementRef,
  ) {}

  ngOnInit() {
    this.loadAllData();

    // Register the required components
    echarts.use([
      TitleComponent,
      TooltipComponent,
      GridComponent,
      DatasetComponent,
      TransformComponent,
      LegendComponent,
      PieChart,
      BarChart,
      LineChart,
      LabelLayout,
      UniversalTransition,
      CanvasRenderer,
    ]);
  }

  ngAfterViewInit(): void {
    this.loadCharts();
    this.loadUserChart();
  }

  toggleChange(event: MatButtonToggleChange) {
    this.tankTypeId = parseInt(event.value, 10);
    this.loadCharts();
    this.loadUserChart();
  }

  loadAllData() {
    this.dashboardFacade.getDashboardData(0, 0, 0);

    this.dashboardFacade.dashboardData.pipe(takeUntil(this.unSubscribe)).subscribe((data) => {
      this.dashboardData = data;
    });
  }

  onStatusChange(event: any) {
    console.log('Selected status:', event);
    this.dashboardFacade.getDashboardData(0, 0, event);
    this.dashboardFacade.dashboardData.subscribe((data) => {
      this.dashboardData = data;
    });
  }
  onUserChange(event: any) {
    console.log('Selected user:', event);
    this.dashboardFacade.getDashboardData(event, 0, 0);
    this.dashboardFacade.dashboardData.subscribe((data) => {
      this.dashboardData = data;
    });
  }

  onTankTypeChange(event: string) {
    this.loadAllData();
    if (event !== 'All') {
      this.dashboardData =
        this.dashboardData?.filter((x) => x.worksheet?.tankType?.value === event) == null
          ? []
          : this.dashboardData?.filter((x) => x.worksheet?.tankType?.value === event);
    }
  }

  loadCharts() {
    const myChart = echarts.init(this._elementRef.nativeElement.querySelector('#chart-container'));
    this.dashboardService
      .getTankWiseStatus(this.tankTypeId)
      .subscribe((res: Response<TankWiseStatus[]>) => {
        console.log(res.data);
        const option: ECOption = {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: 'bottom',
            left: 'center',
            // orient: 'vertical',
          },
          series: [
            {
              color: ['#d0f3fc', '#faeb98', '#a2fa98', '#f298fa'],
              name: '',
              type: 'pie',
              radius: ['30%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                formatter: '{c}',
                fontSize: 14,
                position: 'inside',
                color: '#808080',
                fontStyle: 'italic',
                fontWeight: 'bold',
              },
              // label: {
              //   show: true,
              //   position: 'left',

              // },
              emphasis: {
                focus: 'self',
                // label: {
                //   show: true,
                //   fontSize: 40,
                //   fontWeight: 'bold',
                // },
              },
              labelLine: {
                // show: true,
              },
              data: res.data,
            },
          ],
        };
        myChart.on('click', function (params) {
          // Print name in console
          console.log(params.data);
        });
        myChart.setOption(option);
      });
  }

  loadUserChart() {
    const userChart = echarts.init(
      this._elementRef.nativeElement.querySelector('#user-chart-container'),
    );
    this.dashboardService
      .getUsersByTankWise(this.tankTypeId)
      .subscribe((res: Response<TankWiseStatus[]>) => {
        console.log(res.data);
        const option: ECOption = {
          xAxis: {
            type: 'category',
            data: res.data.map((data) => data.name),
          },
          yAxis: {
            type: 'value',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            data: ['UnAssigned', 'Others', 'tets'],
          },
          series: [
            {
              data: res.data.map((data) => {
                if (data.id === 0)
                  return {
                    id: data.id,
                    value: data.value,
                    itemStyle: {
                      color: '#d0f3fc',
                    },
                  };
                return {
                  id: data.id,
                  value: data.value,
                  itemStyle: {
                    color: '#a3e7de',
                  },
                };
              }),
              type: 'bar',
              label: {
                show: true,
                fontSize: 14,
                color: '#808080',
                fontStyle: 'italic',
                fontWeight: 'bold',
                formatter: '{c}',
                position: 'top',
              },
              emphasis: {
                focus: 'self',
              },
            },
          ],
        };
        userChart.on('click', function (params) {
          // Print name in console
          console.log(params.data);
        });
        userChart.setOption(option);
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}

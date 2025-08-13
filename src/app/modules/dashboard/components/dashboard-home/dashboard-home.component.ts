import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardResponse, TankWiseStatus } from '@app/dashboard/models/dashboard-response';
import { Router } from '@angular/router';
import { Observable, of, Subject, switchMap } from 'rxjs';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
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
import { DashboardService } from '@app/dashboard/services/dashboard.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SharedFacadeService } from '@app/shared/service/shared-facade.service';
import { DEFAULT_TANK_TYPE, WORKSHEET_STATUS } from '@app/shared/constants/shared.contants';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private unSubscribe = new Subject<void>();
  dashboardData: DashboardResponse[] | null = [];
  tankTypeId = DEFAULT_TANK_TYPE;
  statusChartOption$!: Observable<echarts.EChartsCoreOption>;
  userChartOption$!: Observable<echarts.EChartsCoreOption>;

  constructor(
    private sharedFacadeService: SharedFacadeService,
    private dashboardService: DashboardService,
    private router: Router,
  ) {}

  ngOnInit() {
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

  loadCharts() {
    this.statusChartOption$ = this.dashboardService.getTankWiseStatus(this.tankTypeId).pipe(
      switchMap((data: TankWiseStatus[]) => {
        return of({
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: 'bottom',
            left: 'center',
          },
          series: [
            {
              color: ['#fff085', '#b8e6fe', '#b9f8cf', '#ebe6e7'],
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
              emphasis: {
                focus: 'self',
              },
              data: data.map((item) => {
                if (item.value === 0)
                  return {
                    ...item,
                    value: '',
                  };
                return item;
              }),
            },
          ],
        });
      }),
    );
  }

  statusChartClick(event: echarts.ECElementEvent) {
    const data = event.data as { id: number };
    this.sharedFacadeService.updateWorksheetFilter({
      tankTypeId: this.tankTypeId,
      statusId: data?.id,
      userId: 0,
      harvestTypeId: 0,
    });
    this.router.navigate(['/worksheet']);
  }

  loadUserChart() {
    this.userChartOption$ = this.dashboardService.getUsersByTankWise(this.tankTypeId).pipe(
      switchMap((data: TankWiseStatus[]) => {
        return of({
          grid: { containLabel: true },
          title: {
            text: 'No. of tanks assigned against user',
            bottom: 0,
            left: '30%',
            textStyle: {
              fontSize: '12px',
              align: 'right',
              position: 'right',
            },
          },
          xAxis: {
            type: 'category',
            data: data.map((item) => item.name),
            axisLabel: {
              show: true,
              width: 100, //fixed number of pixels
              overflow: 'truncate', // or 'break' to continue in a new line
              interval: 0,
            },
          },
          yAxis: {
            type: 'value',
          },
          tooltip: {
            trigger: 'item',
            extraCssText: 'width:200px; white-space:pre-wrap;',
          },
          series: [
            {
              data: data.map((item) => {
                if (item.id === 0)
                  return {
                    id: item.id,
                    value: item.value,
                    itemStyle: {
                      color: '#ebe6e7',
                    },
                  };
                return {
                  id: item.id,
                  value: item.value,
                  itemStyle: {
                    color: '#c6a3e7',
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
        });
      }),
    );
  }

  userChartClick(event: echarts.ECElementEvent) {
    const data = event.data as { id: number };
    this.sharedFacadeService.updateWorksheetFilter({
      tankTypeId: this.tankTypeId,
      statusId: data?.id ? 0 : WORKSHEET_STATUS.FREE,
      userId: data?.id,
      harvestTypeId: 0,
    });
    this.router.navigate(['/worksheet']);
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}

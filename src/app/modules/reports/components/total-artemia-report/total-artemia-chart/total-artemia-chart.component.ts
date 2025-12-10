import { Component, Input } from '@angular/core';
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
  ToolboxComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { Observable, of, switchMap } from 'rxjs';
import { TransitTable } from 'app/modules/reports/models/report';
import { fontWeight } from 'html2canvas-pro/dist/types/css/property-descriptors/font-weight';

@Component({
  selector: 'app-total-artemia-chart',
  standalone: false,
  templateUrl: './total-artemia-chart.component.html',
  styleUrl: './total-artemia-chart.component.scss',
})
export class TotalArtemiaChartComponent {
  @Input() data: TransitTable[] = [];
  @Input() title: string = 'Total Artemia Report';

  liveChartOption!: echarts.EChartsCoreOption;

  ngOnInit() {
    // Register the required components
    echarts.use([
      TitleComponent,
      TooltipComponent,
      GridComponent,
      DatasetComponent,
      TransformComponent,
      LegendComponent,
      ToolboxComponent,
      PieChart,
      BarChart,
      LineChart,
      LabelLayout,
      UniversalTransition,
      CanvasRenderer,
    ]);
  }

  ngAfterViewInit(): void {
    this.loadUserChart();
  }

  ngOnChanges(): void {
    this.loadUserChart();
  }

  loadUserChart() {
    const screenWidth = window.innerWidth;
    let axisFontSize = 10;
    if (screenWidth < 600) {
      axisFontSize = 8;
    }
    // else if (screenWidth < 900) {
    //   axisFontSize = 10;
    // } else if (screenWidth < 1024) {
    //   axisFontSize = 12;
    // }

    const labelOption = {
      show: true,
      fontSize: axisFontSize,
      color: '#808080',
      fontStyle: 'italic',
      fontWeight: 'bold',
      formatter: '{c}',
      position: 'top',
      rotate: screenWidth > 1024 ? 0 : 90,
    };

    this.liveChartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Day Shift', 'Night Shift', 'Total'],
        fontSize: axisFontSize,
        textStyle: {
          fontSize: axisFontSize,
        },
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          // dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'pie'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: this.data.map((item) => item.unit_sector_name),
          axisLabel: {
            show: true,
            fontSize: axisFontSize,
            fontWeight: 'bold',
            interval: 0,
            rotate: screenWidth > 1024 ? 0 : 30, // or 45 for more tilt
            width: 100,
            overflow: 'truncate', // or 'break'
            formatter: function (value: string) {
              // Optionally break long names into two lines
              return value.length > 15 ? value.slice(0, 12) + '\n' + value.slice(12) : value;
            },
          },
          nameTextStyle: {
            fontSize: axisFontSize,
            fontWeight: 'bold',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          // interval: 50000,
          // splitNumber: 4,
          name: 'Tins',
          nameLocation: 'middle',
          nameGap: 40,
          nameTextStyle: {
            fontSize: axisFontSize,
            fontWeight: 'bold',
          },
          axisLabel: {
            show: true,
          },
        },
      ],
      series: [
        {
          name: 'Day Shift',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series',
          },
          data: this.data.map((item) => this.formatCount(item.day_shift_count)),
          color: '#dd876d',
        },
        {
          name: 'Night Shift',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series',
          },
          data: this.data.map((item) => this.formatCount(item.night_shift_count)),
          color: '#cfa6c3',
        },
        {
          name: 'Total',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series',
          },
          data: this.data.map((item) => this.formatCount(item.total_count)),
          color: '#ccbb85',
        },
      ],
    };
  }

  formatCount(value: string): number {
    const count = parseFloat(value.toLowerCase().replace('tins', '').trim());
    return isNaN(count) ? 0 : parseInt(count.toString(), 10);
  }

  userChartClick(event: echarts.ECElementEvent) {
    const data = event.data as { id: number };
  }
}

import { Component, Input } from '@angular/core';
import { StockInputUnit } from 'app/modules/reports/models/stock-input';

@Component({
  selector: 'app-stock-input-details',
  standalone: false,
  templateUrl: './stock-input-details.component.html',
  styleUrl: './stock-input-details.component.scss',
})
export class StockInputDetailsComponent {
  @Input() data: StockInputUnit[] = [];
  @Input() title: string = '';

  getUnitName(item: StockInputUnit): string {
    const { name, brand, spec } = item;
    return `${name} ${brand ? `- ${brand}` : ''} ${spec ? ` (${spec})` : ''}`.trim();
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-graph-visualization',
  standalone: true,
  imports: [],
  templateUrl: './graph-visualization.component.html',
  styleUrl: './graph-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphVisualizationComponent {

}

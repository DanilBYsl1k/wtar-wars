import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Edge, GraphModule, Node } from "@swimlane/ngx-graph";

@Component({
  selector: 'app-graph-visualization',
  standalone: true,
    imports: [
        GraphModule
    ],
  templateUrl: './graph-visualization.component.html',
  styleUrl: './graph-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphVisualizationComponent {
  nodes = input.required<Node[]>()
  edges = input.required<Edge[]>();
}

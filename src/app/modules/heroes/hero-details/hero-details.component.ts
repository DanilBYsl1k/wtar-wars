import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { Edge, NgxGraphModule, Node } from "@swimlane/ngx-graph";
import { ActivatedRoute } from "@angular/router";

import { FullInfoHero } from "@shared/interface/hero.interface";
import { IFilmsInterface } from "@shared/interface/films.interface";
import { ShipsFilmsType } from "@shared/types/ships-films.type";
import { IStarship } from "@shared/interface/starships.interface";
import { GraphVisualizationComponent } from "@shared/components/graph-visualization/graph-visualization.component";

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [
    NgxGraphModule,
    GraphVisualizationComponent
  ],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailsComponent implements OnInit {
  hero = signal<FullInfoHero | null>(null);
  imgHero = computed<string>((): string => `https://starwars-visualguide.com/assets/img/characters/${this.hero()?.id}.jpg`);
  nodes: Node[] = []
  edges: Edge[] = [];

  constructor(private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let { hero } = this.activeRoute.snapshot.data
    this.hero.set(hero)
    this.buildGraph(hero)
  }

  private buildGraph(hero: FullInfoHero): void {
    this.addHeroNode(hero);
    this.addFilmNodesAndEdges(hero.films, hero.id);
    this.addStarshipNodes(hero.starships);
    this.addFilmShipEdges(hero.filmsShips);
  }

  private addHeroNode({ id, name }: FullInfoHero): void {
    this.nodes.push({ id: `hero ${id}`, label: name });
  }

  private addFilmNodesAndEdges(films: IFilmsInterface[], heroId: number): void {
    for (const { id, title } of films) {
      this.nodes.push({ id: `film ${id}`, label: title })
      this.edges.push({ source: `hero ${heroId}`, target: `film ${id}`, label: 'hero in film' })
    }
  }

  private addStarshipNodes(starships: IStarship[]): void {
    for (const starship of starships) {
      this.nodes.push({ id: `ship ${starship.id}`, label: starship.name });
    }
  }

  private addFilmShipEdges(filmShips: ShipsFilmsType): void {
    for (const { shipId, films } of filmShips) {
      for (const film of films) {
        this.edges.push({ source: `film ${film}`, target: `ship ${shipId}`, label: 'film with ship' })
      }
    }
  }
}

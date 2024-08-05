import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { Edge, NgxGraphModule, Node } from "@swimlane/ngx-graph";
import { ActivatedRoute } from "@angular/router";

import { IHeroInterface } from "@shared/interface/hero.interface";

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [
    NgxGraphModule
  ],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailsComponent implements OnInit {
  hero = signal<IHeroInterface | null>(null);
  imgHero = computed(()=> `https://starwars-visualguide.com/assets/img/characters/${this.hero()?.id}.jpg`);
  nodes: Node[] = []
  edges: Edge[] = [];

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    let { hero } = this.activeRoute.snapshot.data
    this.hero.set(hero)
    this.buildGraph(hero)
  }

  private buildGraph(hero: any): void {
    this.addHeroNode(hero);
    this.addFilmNodesAndEdges(hero.films, hero.id);
    this.addStarshipNodes(hero.starships);
    this.addFilmShipEdges(hero.filmsShips);
  }

  private addHeroNode({ id, name }: any): void {
    this.nodes.push({ id: `hero ${id}`, label: name });
  }

  private addFilmNodesAndEdges(films: any, heroId: any): void {
    for (const { id, title } of films) {
      this.nodes.push({ id: `film ${id}`, label: title })
      this.edges.push({ source: `hero ${heroId}`, target: `film ${id}`, label: 'film with hero' })
    }
  }

  private addStarshipNodes(starships: any): void {
    for (const starship of starships) {
      this.nodes.push({ id: `ship ${starship.id}`, label: starship.name });
    }
  }

  private addFilmShipEdges(filmShips: any): void {
    for (const { shipId, films } of filmShips) {
      for (const film of films) {
        this.edges.push({ source: `film ${film}`, target: `ship ${shipId}`, label: 'film with ship' })
      }
    }
  }
}

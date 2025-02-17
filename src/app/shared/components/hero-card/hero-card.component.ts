import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IHeroInterface } from "@shared/interface/hero.interface";
import { RouterLink } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCardComponent {
  hero = input.required<IHeroInterface>();
  imgHero = computed(()=> `https://starwars-visualguide.com/assets/img/characters/${this.hero().id}.jpg`);

}

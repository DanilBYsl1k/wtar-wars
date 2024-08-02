import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IHeroInterface } from "@shared/interface/hero.interface";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCardComponent {
  hero = input.required<IHeroInterface>();
}

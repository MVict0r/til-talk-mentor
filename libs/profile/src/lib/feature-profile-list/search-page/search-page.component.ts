import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../../feature-profile-list';
import { selectFilteredProfiles } from 'libs/data-access/src';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store)

  profiles = this.store.selectSignal(selectFilteredProfiles);
}

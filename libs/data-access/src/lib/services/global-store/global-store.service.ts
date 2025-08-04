import { Injectable, signal } from '@angular/core';
import { ProfileInterface } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})

export class GlobalStoreService {
  me = signal<ProfileInterface | null>(null)
}

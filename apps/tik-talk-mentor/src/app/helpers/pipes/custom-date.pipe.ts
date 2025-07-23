import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(date: string): string {
    const currentDate = new Date();
    const createdDate = new Date(date);

    const diffMs = currentDate.getTime() - createdDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) return 'только что';
    if (diffMin < 60) return `${diffMin} мин назад`;
    if (diffHours < 24) return `${diffHours} ч назад`;
    if (diffDays >= 1) return `${diffDays} дн назад`;

    return createdDate.toLocaleDateString();
  }
}

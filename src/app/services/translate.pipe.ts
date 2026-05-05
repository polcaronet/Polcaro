import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from './translate.service';
import { Subscription } from 'rxjs';

@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey = '';
  private lastValue = '';
  private sub: Subscription;

  constructor(
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {
    this.sub = this.translateService.lang$.subscribe(() => {
      if (this.lastKey) {
        this.lastValue = this.translateService.t(this.lastKey);
        this.cdr.markForCheck();
      }
    });
  }

  transform(key: string): string {
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.lastValue = this.translateService.t(key);
    }
    return this.lastValue;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

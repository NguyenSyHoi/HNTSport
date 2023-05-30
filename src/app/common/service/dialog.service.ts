import { Injectable, TemplateRef, Type, ApplicationRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class DialogService {
  constructor(
    private modal: NzModalService,
  ) { }
  openDialog<T>(
    component: string | TemplateRef<NzSafeAny> | Type<T>,
    dialogData?: Partial<T>,
    width?: number | string,
    closeable = true,
    title?: string,
    closeIcon?: string | TemplateRef<void>
  ): NzModalRef {
    if (closeIcon) {
      return this.modal.create({
        nzContent: component,
        nzWrapClassName: 'vt-dialog',
        nzCentered: true,
        nzFooter: null,
        nzWidth: width,
        nzTitle: title ? title : undefined,
        nzCloseIcon: closeIcon ? closeIcon : undefined,
        nzComponentParams: dialogData,
      });
    }
    return this.modal.create({
      nzContent: component,
      nzWrapClassName: 'vt-dialog',
      nzCentered: true,
      nzFooter: null,
      nzWidth: width,
      nzTitle: title ? title : undefined,
      nzClosable: closeable,
      nzComponentParams: dialogData,
    });
  }
  closeModal() {
    this.modal.closeAll();
  }
}

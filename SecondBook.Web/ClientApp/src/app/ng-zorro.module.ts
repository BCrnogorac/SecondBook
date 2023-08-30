import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import {
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  ShoppingOutline,
  ShoppingFill,
  EuroCircleFill,
  BookFill,
  UserOutline,
  CalendarFill,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  ShoppingOutline,
  ShoppingFill,
  EuroCircleFill,
  BookFill,
  UserOutline,
  CalendarFill,
];

@NgModule({
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCarouselModule,
    NzCardModule,
    NzListModule,
    NzSelectModule,
    NzAlertModule,
    NzDividerModule,
    NzMessageModule,
    NzModalModule,
    NzCollapseModule,
    NzNotificationModule,
    NzPopconfirmModule,
    NzIconModule.forChild(icons),
  ],
  exports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    NzRadioModule,
    NzDatePickerModule,
    NzMenuModule,
    NzCarouselModule,
    NzCardModule,
    NzListModule,
    NzAlertModule,
    NzDividerModule,
    NzMessageModule,
    NzModalModule,
    NzCollapseModule,
    NzNotificationModule,
    NzPopconfirmModule,
  ],
})
export class NgZorroModule {}

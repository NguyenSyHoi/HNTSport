import { Component } from '@angular/core';
import {ContactModule} from "../contact/contact-module";
import {NzIconModule} from "ng-zorro-antd/icon";
import {DestroyService} from "../../../../../common/service/destroy.service";
import {SelectSizeModule} from "./select-size-module";

@Component({
  selector: 'app-select-size',
  templateUrl: './select-size.component.html',
  styleUrls: ['./select-size.component.scss'],
  standalone: true,
  imports: [SelectSizeModule],
  providers: [DestroyService]
})
export class SelectSizeComponent {

}

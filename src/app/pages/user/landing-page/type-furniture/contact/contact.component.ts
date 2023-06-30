import { Component } from '@angular/core';
import {DestroyService} from "../../../../../common/service/destroy.service";
import {ContactModule} from "./contact-module";
import {NzIconModule} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [ContactModule, NzIconModule],
  providers: [DestroyService]
})
export class ContactComponent {

}

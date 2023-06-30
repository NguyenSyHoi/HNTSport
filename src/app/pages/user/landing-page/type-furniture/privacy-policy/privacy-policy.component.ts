import { Component } from '@angular/core';
import {DestroyService} from "../../../../../common/service/destroy.service";
import {PrivacyPolicyModule} from "./privacy-policy-module";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  standalone: true,
  imports: [PrivacyPolicyModule],
  providers: [DestroyService]
})
export class PrivacyPolicyComponent {

}

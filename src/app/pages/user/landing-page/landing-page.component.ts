import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LandingPageModule } from './landing-page-module';
import { NewFunitureService } from './type-furniture/new-funiture/services/new-funiture-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: true,
  imports: [LandingPageModule],
})
export class LandingPageComponent implements OnInit {
  isLoading = this.service.getLoading();
  constructor(private service: NewFunitureService) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderModule } from './header-module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [HeaderModule]
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  login(){
    this.router.navigate(['/login'])
  }
}

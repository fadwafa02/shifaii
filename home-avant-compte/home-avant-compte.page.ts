import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-avant-compte',
  templateUrl: './home-avant-compte.page.html',
  styleUrls: ['./home-avant-compte.page.scss'],
})
export class HomeAvantComptePage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  goAlimentation() {
    this.router.navigate(['/aliment']);
  }
}

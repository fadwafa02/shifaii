import { Component, OnInit } from '@angular/core';
import {  medecinUid } from 'src/firebaseConfig';


@Component({
  selector: 'app-app-medecin',
  templateUrl: './app-medecin.page.html',
  styleUrls: ['./app-medecin.page.scss'],
})
export class AppMedecinPage implements OnInit {

  constructor() { }

  ngOnInit() {
console.log('uidmedecin',medecinUid.uid)
  }

}

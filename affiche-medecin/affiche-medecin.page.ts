import { Component, OnInit } from '@angular/core';
import { getMedecinByUid } from 'src/firebaseConfig';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { medecinUid } from 'src/app/recherche-medecin/recherche-medecin.page';
  import { Subject } from 'rxjs';
  import { takeUntil } from 'rxjs/operators';
  import { PersonneModalComponent } from './personne-modal/personne-modal.component';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-affiche-medecin',
  templateUrl: './affiche-medecin.page.html',
  styleUrls: ['./affiche-medecin.page.scss'],
})
export class AfficheMedecinPage implements OnInit {

  medecin: any;
  private medecinSubscription: Subscription | undefined ; 
  medecinid ="" ;

  constructor( private firestore: AngularFirestore, private modalController: ModalController) {
  }

  ngOnInit() {
 
    this.medecinid = medecinUid;
    if (this.medecinid) {
      console.log('Médecin UID récupéré non :', this.medecinid);
      this.fetchMedecin(this.medecinid);
      console.log(this.medecin[0].nom);
    } else {
      console.error('Erreur: medecinUid est undefined.');
    }
  }

  async fetchMedecin(medecinUidValue: string) {
    try {
      this.medecin = await getMedecinByUid(this.firestore, medecinUidValue);
      console.log('Médecin récupéré :', this.medecin);
    } catch (error) {
      console.error('Erreur lors de la récupération du médecin :', error);
    }
  }




  // Working hours for the day
  workHours: { start: string, end: string }[] = [
    { start: '08:00', end: '08:30' },
    { start: '08:30', end: '09:00' },
    { start: '09:00', end: '09:30' },
    { start: '09:30', end: '10:00' },
    { start: '10:00', end: '10:30' },
    { start: '10:30', end: '11:00' },
    { start: '11:00', end: '11:30' },
    { start: '11:30', end: '12:00' },
    { start: '14:00', end: '14:30' },
    { start: '14:30', end: '15:00' },
    { start: '15:00', end: '15:30' },
    { start: '15:30', end: '16:00' },
    { start: '16:00', end: '16:30' },
    { start: '16:30', end: '17:00' },
];

  





async openWorkHoursModal() {
  const modal = await this.modalController.create({
    component: PersonneModalComponent,
    cssClass: 'personne-modal',
  });
  return await modal.present();
}
}


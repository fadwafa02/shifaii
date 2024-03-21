import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {  ModalController } from '@ionic/angular';
import { RendezVousData, getRdvByMedUid, medecinUid } from 'src/firebaseConfig';
import { FichePatientModalComponent } from './fiche-patient-modal/fiche-patient-modal.component';


@Component({
  selector: 'app-affiche-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
@Component({
  selector: 'app-fiche-patient-not-found',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Fiche Patient Non Trouvée</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-content>
          <p>Fiche patient non trouvée.</p>
        </ion-card-content>
        <ion-card-footer>
          <ion-button (click)="createFichePatient()">Créer une fiche patient</ion-button>
        </ion-card-footer>
      </ion-card>
    </ion-content>
  `,
})
export class PatientPage implements OnInit {

  rdvs: RendezVousData[] = [];
  uid: string = medecinUid.uid;
  constructor(private firestore: AngularFirestore, private modalController: ModalController) {
    this.loadRdv();
  }

  ngOnInit() {
  }

  async loadRdv() {
    try {
      const rdvs = await getRdvByMedUid(this.firestore, this.uid);
      if (rdvs && rdvs.length > 0) {
        this.rdvs = rdvs;
        console.log("rendez-vous trouve ", rdvs)
      } else {
        console.log('Aucun rendez-vous trouvé pour ce médecin.');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
    }
  }

  async openFichePatientModal(rendezVous: RendezVousData) {
    const modal = await this.modalController.create({
      component: FichePatientModalComponent,
      componentProps: {
        rendezVousData: rendezVous
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        // Enregistrez les données de la fiche patient dans la base de données Firebase ici
        console.log('Données de la fiche patient à enregistrer :', data.data);
      }
    });

    return await modal.present();
  }
  fichePatientExiste: boolean = false;

  async showFichePatient(rdv: RendezVousData) {
    try {

      const fichePatientRef = this.firestore.collection('medecin').doc(rdv.medecinuid).collection('patients').doc(rdv.nom);
      const fichePatientSnapshot = await fichePatientRef.get().toPromise(); // Convertir l'observable en promesse
      
      
      if (fichePatientSnapshot && fichePatientSnapshot.exists) {
        this.fichePatientExiste= true ;
        const fichePatientData = fichePatientSnapshot.data();
        const modal = await this.modalController.create({
          component: FichePatientModalComponent,
          componentProps: {
            fichePatientData: fichePatientData // Passer les données de la fiche patient au composant modal
          }
        });
        await modal.present();
      } else {
        
      }
    }
        
        
     catch (error) {
      console.error('Erreur lors de l\'ouverture de la fiche patient :', error);
    }
  
  
}
}

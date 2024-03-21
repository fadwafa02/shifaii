import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { RendezVousData, getRdvByMedUid, medecinUid } from 'src/firebaseConfig';
import { FichePatientModalComponent } from './fiche-patient-modal/fiche-patient-modal.component';
import { meduid } from '../login-medecin/login-medecin.page';


@Component({
  selector: 'app-affiche-patient',
  templateUrl: './affiche-patient.page.html',
  styleUrls: ['./affiche-patient.page.scss'],
})
export class AffichePatientPage implements OnInit {

  rdvs: RendezVousData[] = [];
  constructor(private firestore: AngularFirestore, private modalController: ModalController) {
    this.loadRdv();
  }

  ngOnInit() {
  }

  async loadRdv() {
    try {
      const rdvs = await getRdvByMedUid(this.firestore, meduid); // Utilisez medecinUid.uid pour obtenir l'UID du médecin
      if (rdvs && rdvs.length > 0) {
        this.rdvs = rdvs;
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
}

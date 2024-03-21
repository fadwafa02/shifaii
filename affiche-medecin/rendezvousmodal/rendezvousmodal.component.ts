import { Component, Input, NgModule } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectedHour, selectedDate } from '../work-hours-modal/work-hours-modal.component';
import { selectedNom, selectedPrenom } from '../personne-modal/personne-modal.component';
import { medecinUid } from 'src/app/recherche-medecin/recherche-medecin.page';
import { inscritUid } from 'src/app/login/login.page';
import { AddRendezVous, AddRendezVousForUser, getMedecinByUid,generateUniqueKey } from 'src/firebaseConfig';

interface MedecinData {
  nom: string;
  prenom: string;
  uid: string;
}

interface RendezVousData {
  date: string;
  heure: string;
  nom: string;
  prenom: string;
  useruid: string;
  medecinNom: string;
  medecinPrenom: string;
  medecinuid:string;
  key: string; // Ajout de la clé unique pour le rendez-vous
}

@Component({
  selector: 'app-rendezvousmodal',
  templateUrl: './rendezvousmodal.component.html',
  styleUrls: ['./rendezvousmodal.component.scss'],
})
export class RendezvousmodalComponent {
  @Input() medecin: MedecinData = { nom: '', prenom: '', uid: '' };
  selectedTime: string = selectedHour;
  dates: string = selectedDate;
  patientName = selectedPrenom;
  patientnom = selectedNom;
  uid = inscritUid;
  nommed = this.medecin.nom; 
  medecinuid=medecinUid;// Assignation du nom du médecin
  
  constructor(private modalController: ModalController, private firestore: AngularFirestore) {}

  async ngOnInit() {
    console.log("prenom = ", selectedNom);
    console.log("time = ", selectedHour);
    console.log("medecinuid =", medecinUid);
    console.log("useruid =", inscritUid);
    console.log("date selectionne =", selectedDate);

    try {
      const medecinData: MedecinData[] | null = await getMedecinByUid(this.firestore, medecinUid);
      if (medecinData && medecinData.length > 0) { // Vérifiez si des données de médecin ont été récupérées et si elles ne sont pas null
        this.medecin = medecinData[0];
        this.nommed = this.medecin.nom;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations du médecin:', error);
    }
  }

  async saveRendezVous() {
    
    const rendezVousData: RendezVousData = {
      date: selectedDate,
      heure: selectedHour,
      nom: selectedNom,
      prenom: selectedPrenom,
      useruid: inscritUid,
      medecinNom: this.medecin.nom,
      medecinPrenom: this.medecin.prenom,
      medecinuid : medecinUid ,
      key: await generateUniqueKey(), // Générer une clé unique pour le rendez-vous
    };
    const k=rendezVousData.key;
    AddRendezVous(this.firestore, medecinUid, rendezVousData)
      .then(() => {
        console.log('Rendez-vous enregistré avec succès.');
        console.log('key= ',k);
        this.closeModal();
      })
      .catch((error) => {
        console.error('Erreur lors de l\'enregistrement du rendez-vous :', error);
    
      });

    AddRendezVousForUser(this.firestore, inscritUid, rendezVousData)
      .then(() => {
        console.log('Rendez-vous enregistré avec succès chez le patient.');
        
        this.closeModal();
      })
      .catch((error) => {
        console.error('Erreur lors de l\'enregistrement du rendez-vous chez le patient:', error);
      });
  }
  
  closeModal() {
    this.modalController.dismiss();
  }
}

@NgModule({
  declarations: [RendezvousmodalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [AngularFirestore],
})
export class RendezvousmodalModule {}

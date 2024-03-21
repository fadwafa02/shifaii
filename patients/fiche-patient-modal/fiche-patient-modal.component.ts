import {  CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Assurez-vous que le chemin d'importation est correct
import { savePatient } from 'src/firebaseConfig';



interface RendezVousData {
  date: string;
  heure: string;
  nom: string;
  prenom: string;
  useruid: string;
  medecinNom?: string; // Ajout de la propriété medecinNom comme optionnelle
  medecinPrenom?: string; 
  medecinuid:string;// Ajout de la propriété medecinPrenom comme optionnelle
  key:string ;
  excuse?:string;
  statut?:string;
}
@Component({
  selector: 'app-fiche-patient-modal',
  templateUrl: './fiche-patient-modal.component.html',
  styleUrls: ['./fiche-patient-modal.component.scss'],
})
export class FichePatientModalComponent implements OnInit {
  @Input() rendezVousData!: RendezVousData; // Propriété d'entrée pour recevoir les données du rendez-vous

  fichePatient = {
    nom: '',
    prenom: '',
    age: null,
    adresse: '',
    telephone: ''
    // Ajoutez d'autres champs selon vos besoins
  };
  

  constructor(private firestore: AngularFirestore,private modalController: ModalController) {
    // Initialisez rendezVousData ici si nécessaire
    this.rendezVousData = {} as RendezVousData;
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss(); // Fermer le modal
  }

  async saveFichePatient() {
    try {
      this.fichePatient.nom = this.rendezVousData.nom;
      this.fichePatient.prenom = this.rendezVousData.prenom ;
      console.log('Données de la fiche patient à sauvegarder :', this.fichePatient);

      // Appel de la fonction savePatient pour sauvegarder le patient chez le médecin
      await savePatient(this.firestore, this.fichePatient, this.rendezVousData.medecinuid);

      this.modalController.dismiss({ data: this.fichePatient });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du patient chez le médecin :', error);
    }
  }

}

@NgModule({
  declarations: [FichePatientModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [AngularFirestore],
})
export class FichePatientModalModule {}


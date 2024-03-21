import {  CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

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

  constructor(private modalController: ModalController) {
    // Initialisez rendezVousData ici si nécessaire
    this.rendezVousData = {} as RendezVousData;
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss(); // Fermer le modal
  }

  saveFichePatient() {
    // Ajoutez ici le code pour sauvegarder les données de la fiche patient
    // Vous pouvez utiliser this.fichePatient pour accéder aux données
    console.log('Données de la fiche patient à sauvegarder :', this.fichePatient);
    this.modalController.dismiss({ data: this.fichePatient }); // Renvoyer des données au composant principal
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


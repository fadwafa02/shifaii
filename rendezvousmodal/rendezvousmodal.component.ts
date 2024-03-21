import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface MedecinData {
  nom: string;
  prenom: string;
  uid: string; // Ajoutez l'UID du médecin
  // Ajoutez d'autres propriétés du médecin si nécessaire
}

interface RendezVousData {
  date: string;
  heure: string;
  prenom: string;
  nom: string;
  uidPatient: string; // Renommé idPatient en uidPatient
}

@Component({
  selector: 'app-rendezvousmodal',
  templateUrl: './rendezvousmodal.component.html',
  styleUrls: ['./rendezvousmodal.component.scss'],
})
export class RendezVousModalComponent {
  @Input() medecin: MedecinData = { nom: '', prenom: '', uid: '' }; // Initialisez la propriété medecin

  selectedTime: string = ''; // Heure sélectionnée pour le rendez-vous
  patientName: string = ''; // Nom du patient (pré-rempli avec le nom du médecin)
  uidPatient: string = ''; // UID du patient

  constructor(private modalController: ModalController, private firestore: AngularFirestore) {}

  closeModal() {
    this.modalController.dismiss();
  }




}
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getMedicamentByName } from 'src/firebaseConfig';


interface MedicamentDD {
  class: string;
  conditionnement: string;
  conservation: string;
  amm: string;
  dateamm: string;
  dci: string;
  dosage: string;
  forme: string;
  indication: string;
  laboratoire: string;
  sousclass: string;
  specialite: string;
  specification: string;
  tableau: string;
}

@Component({
  selector: 'app-recherche-medicament',
  templateUrl: './recherche-medicament.page.html',
  styleUrls: ['./recherche-medicament.page.scss'],
})
export class RechercheMedicamentPage implements OnInit {

 

  medicaments: MedicamentDD[] = [];
  nom: string = '';

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  async fetchMedicament() {
    try {
      if (this.nom) {
        const medicaments = await getMedicamentByName(this.firestore, this.nom);
        console.log('Médecins disponibles :', medicaments);
      } else {
        console.error('Paramètres de recherche non valides.');
        // Ajoutez une logique pour afficher un message à l'utilisateur, si nécessaire
        // Par exemple, utilisez une alerte ou un autre mécanisme pour informer l'utilisateur
        // d'entrer des paramètres valides pour la recherche.
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du medicament (fetchMedicament):', error);
    }
  }
  

}

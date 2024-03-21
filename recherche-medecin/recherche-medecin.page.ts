import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getMedecinsByLocalisationAndSpecialite } from 'src/firebaseConfig';
import { NavController } from '@ionic/angular';

// Interface pour décrire le format des données des médecins
interface MedecinData {
  uid: string;
  nom: string;
  prenom: string;
  localisation: string;
  specialite: string;
  // ... autres champs si nécessaire
}

@Component({
  selector: 'app-recherche-medecin',
  templateUrl: './recherche-medecin.page.html',
  styleUrls: ['./recherche-medecin.page.scss'],
})
export class RechercheMedecinPage implements OnInit {

  medecins: MedecinData[] = [];
  etat: string | null = null;
  specialite: string | null = null;


  specialites: string[] = [
    'Médecine générale',
    'Cardiologie',
    'Chirurgie générale',
    'Pédiatrie',
    'Gynécologie obstétrique',
    'Radiologie',
    'Médecine interne',
    'Orthopédie',
    'Ophtalmologie',
    'Dermatologie',
    'Anesthésiologie',
    'Neurologie',
    'Gastro-entérologie',
    'Urologie',
    'Oncologie',
    'Médecine d\'urgence',
    'Pneumologie',
    'Endocrinologie',
    'Néphrologie',
    'Rhumatologie',
    'Psychiatrie',
    'Médecine du travail',
    'Pédiatrie néonatale',
    'Infectiologie',
    'Hématologie',
    'Pédiatrie médicale',
    'Médecine de réadaptation',
    'Médecine du sport',
    'Pédiatrie chirurgicale',
    'Chirurgie orthopédique',
    'Chirurgie cardiovasculaire',
    'Chirurgie plastique et reconstructive',
    'Médecine nucléaire',
    'Allergologie',
    'Pédiatrie sociale',
    'Chirurgie vasculaire',
    'Médecine légale',
    'Gériatrie',
    'Médecine de famille',
    'Hépato-gastro-entérologie',
    'Médecine tropicale',
    'Chirurgie maxillo-faciale',
    'Médecine de la douleur',
    'Médecine palliative',
    'Endocrinologie pédiatrique',
    'Néonatologie',
    'Chirurgie thoracique',
    'Chirurgie abdominale',
    'Néonatalogie',
    'Immunologie'
  ];

  etatsTunisiens: string[] = [
    'Ariana',
    'Beja',
    'Ben Arous',
    'Bizerte',
    'Gabes',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kebili',
    'Le Kef',
    'Mahdia',
    'La Manouba',
    'Médenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan',
  ];
  

  constructor(private firestore: AngularFirestore, private navCtrl: NavController) { }

  ngOnInit() {
    this.fetchMedecins();
  }

  async fetchMedecins() {
    try {
      if (this.etat && this.specialite) {
        this.medecins = await getMedecinsByLocalisationAndSpecialite(this.firestore, this.etat, this.specialite);
        console.log('Médecins disponibles :', this.medecins);
      } else {
        console.error('Paramètres de recherche non valides.');
        // Ajoutez une logique pour afficher un message à l'utilisateur, si nécessaire
        // Par exemple, utilisez une alerte ou un autre mécanisme pour informer l'utilisateur
        // d'entrer des paramètres valides pour la recherche.
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des médecins (fetchMedecins):', error);
      // Ajoutez une logique pour afficher un message à l'utilisateur en cas d'erreur
      // Par exemple, utilisez une alerte ou un autre mécanisme pour informer l'utilisateur
      // qu'une erreur s'est produite lors de la récupération des médecins.
    }
  }

  goToAfficheMedecin(medecinUidValue: string) {
    // Stockez le medecinUid dans la variable exportée
    medecinUid = medecinUidValue;
    console.log('uid envoyé est :',medecinUidValue);
  
    // Utilisez this.navCtrl pour naviguer vers la page AfficheMedecinPage
    this.navCtrl.navigateForward('/affiche-medecin');
  }
  
}
export let medecinUid: string;


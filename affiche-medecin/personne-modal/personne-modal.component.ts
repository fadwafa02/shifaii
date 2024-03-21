import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { inscritUid } from 'src/app/login/login.page';
import { getPersonByUid } from 'src/firebaseConfig';
import { WorkHoursModalComponent } from '../work-hours-modal/work-hours-modal.component';
import { AjoutPersonneModalComponent } from '../ajout-personne-modal/ajout-personne-modal.component';

interface PersonneData {
  uid: string;
  nom: string;
  prenom: string;
}

@Component({
  selector: 'app-personne-modal',
  templateUrl: './personne-modal.component.html',
  styleUrls: ['./personne-modal.component.scss'],
})
export class PersonneModalComponent  implements OnInit {


  constructor(private firestore: AngularFirestore, private modalController: ModalController) { }

  ngOnInit() {
    this.fetchPersonne();
  }


  people: any[] = [];
  


  async fetchPersonne() {
    try {
      const uid = "D1UoD4reN0QvhgGDFnarodjbE782";
      const personnes = await getPersonByUid(this.firestore, uid);
      if (personnes !== null) {
        this.people = this.people.map(person => ({ ...person, selected: false }));
      personnes.forEach(personne => {
        this.people.push(personne);
      });
      console.log('Personne trouvée :', this.people);
    }
    } catch (error) {
      console.error('Erreur lors de la récupération de la personne par UID :', error);
    }
  }
person : PersonneData[] = [];

selectedPersonne: PersonneData | null = null;


toggleSelection(person: PersonneData) {
  this.selectedPersonne = person;
  selectedNom = person.nom;
  selectedPrenom = person.prenom;
  selecteduid=person.uid;
  console.log('Nom de la personne sélectionnée :', selectedNom);
  console.log('Prénom de la personne sélectionnée :', selectedPrenom);
}

  close() {
    this.modalController.dismiss();
  }

  async openWorkHoursModal() {
    const modal = await this.modalController.create({
      component: WorkHoursModalComponent,
      cssClass: 'work-hours-modal',
    });
    this.close
    return await modal.present();
  }

  async ajoutPersonneModal(){
    const modal = await this.modalController.create({
      component: AjoutPersonneModalComponent,
      cssClass: 'work-hours-modal',
    });
    return await modal.present();
  }

}

@NgModule({
  declarations: [PersonneModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [AngularFirestore],
})
export class PersonneModalModule {}

export let selectedNom: string ;
export let selectedPrenom: string ;
export let selecteduid : string ;
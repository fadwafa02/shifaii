import { Component, NgModule, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { savePersonData } from 'src/firebaseConfig';
import { inscritUid } from 'src/app/login/login.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ajout-personne-modal',
  templateUrl: './ajout-personne-modal.component.html',
  styleUrls: ['./ajout-personne-modal.component.scss'],
})
export class AjoutPersonneModalComponent  implements OnInit {

  nom:string="";
  prenom:string="";
  uidPersonne=inscritUid;

  constructor(private firestore: AngularFirestore,private modalController: ModalController) { }

  ngOnInit() {
    console.log("uid = ",this.uidPersonne)
  }

  async savePerson() {
    try {
        await savePersonData(this.firestore, this.nom, this.prenom, this.uidPersonne);
        console.log("personne ajouter ",this.nom,' et ',this.prenom)
        // Logique à exécuter après l'enregistrement des données de la personne
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données de la personne :', error);
        // Gérez l'erreur selon vos besoins
    }

    await this.modalController.dismiss();
}

}


@NgModule({
  declarations: [AjoutPersonneModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [AngularFirestore],
})
export class AjoutPersonneModalModule {}
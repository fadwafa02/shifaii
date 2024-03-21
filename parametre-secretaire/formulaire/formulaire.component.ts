// formulaire.component.ts

import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ajouterSecretaire ,medecinUid} from 'src/firebaseConfig';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})




export class FormulaireComponent {
  @Output() formulaireSoumis = new EventEmitter<any>();
  @Output() fermerFormulaire = new EventEmitter<void>();

  myForm: FormGroup = this.fb.group({
    prenom: ['', Validators.required],
    nom: ['', Validators.required],
    numero: ['', Validators.required],
    gmail: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    // Ajoutez d'autres champs ici
  });



  constructor(private modalController: ModalController, private firestore: AngularFirestore,private fb: FormBuilder) {}

  onSubmit() {

  const medecinid = medecinUid.uid;

    if (this.myForm.valid) {
      this.formulaireSoumis.emit(this.myForm.value);
      this.fermerFormulaire.emit();
    }
  }


  async ouvrirFormulaireModal() {
    const modal = await this.modalController.create({
      component: FormulaireComponent,
    });
  
    await modal.present();
  
    modal.onDidDismiss().then((result) => {
      // Vérifiez si le formulaire a été soumis
      if (result.role === 'formulaireSoumis') {
        const secretarieData = this.myForm.value; // Utilisez directement les valeurs du formulaire
        this.enregistrerSecretaire();
      }
    });
  }
  

  async enregistrerSecretaire() {
    const nom = this.myForm.get('nom')?.value;
    const prenom = this.myForm.get('prenom')?.value;
    const mail = this.myForm.get('gmail')?.value;
    const numero = this.myForm.get('numero')?.value;
    const password = this.myForm.get('password')?.value;
    const medecinUid = 'b2xIfQRkJABI4OL9JehI';
  
    try {
      await ajouterSecretaire(this.firestore,  nom, prenom, mail, numero, password, medecinUid );
      // Effectuez d'autres actions après l'enregistrement réussi
      console.log('Secrétaire enregistrée avec succès.');
      this.modalController.dismiss(); // Fermer le modal après l'enregistrement réussi
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du secrétaire :', error);
      // Gérez les erreurs ici
    }
  }
  
  
}


@NgModule({
  declarations: [FormulaireComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [FormulaireComponent],
  providers: [AngularFirestore],
})
export class FormulaireModule {}



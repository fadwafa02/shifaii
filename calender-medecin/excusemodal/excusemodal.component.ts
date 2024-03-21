import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-excuse-modal',
  templateUrl: 'excusemodal.component.html',
  styleUrls: ['./excusemodal.component.scss'],
})
export class ExcuseModalComponent implements OnInit {
  predefinedExcuses: string[] = [
    'Urgence personnelle',
    'Conflit d\'horaire',
    'Maladie inattendue',
    'Autre'
  ];
  selectedExcuse1: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  confirm() {
    selectedExcuse = this.selectedExcuse1;
    if (this.selectedExcuse1) {
      console.log('Excuse sélectionnée :', this.selectedExcuse1);
      this.modalController.dismiss(this.selectedExcuse1);
    } else {
      console.log('Aucune excuse sélectionnée.');
    }
  }
}
@NgModule({
  declarations: [ExcuseModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [AngularFirestore],
})
export class excusemodalModule {}
export let selectedExcuse: string ;

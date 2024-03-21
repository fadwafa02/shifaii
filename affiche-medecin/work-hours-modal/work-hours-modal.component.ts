import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { PersonneModalComponent } from '../personne-modal/personne-modal.component';
import { RendezvousmodalComponent } from '../rendezvousmodal/rendezvousmodal.component';
import { medecinUid } from 'src/app/recherche-medecin/recherche-medecin.page';



@Component({
  selector: 'app-work-hours-modal',
  templateUrl: './work-hours-modal.component.html',
  styleUrls: ['./work-hours-modal.component.scss'],
})
export class WorkHoursModalComponent implements OnInit {

  // Working hours for the day
  workHours: string[] = [
    '8H00 - 8H30',
    '8H30 - 9H00',
    '9H00 - 9H30',
    '9H30 - 10H00',
    '10H00 - 10H30',
    '10H30 - 11H00',
    '11H00 - 11H30',
    '11H30 - 12H00',
    '14H00 - 14H30',
    '14H30 - 15H00',
    '15H00 - 15H30',
    '15H30 - 16H00',
    '16H00 - 16H30',
    '16H30 - 17H00',
  ];

 

  constructor(private modalController: ModalController, private firestore: AngularFirestore) {}

  ngOnInit() {
    // Initialisez ici votre composant
  }

  close() {
    this.modalController.dismiss();
  }
  selectedDate: string = '';
  toggleSelection(hour: string, date: string) {
   selectedHour = hour;
   selectedDate = date;
    console.log('Heure sélectionnée :', selectedHour);
    console.log('Date sélectionnée :', selectedDate);
  }

  generateDateList(): string[] {
    const dateList: string[] = [];
    const today = new Date();
    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
  
      // Vérifier si la date générée est un samedi ou un dimanche
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const formattedDate = this.convertDateToString(date);
        dateList.push(formattedDate);
      }
    }
    return dateList;
  }
  
  convertDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


   async openWorkHoursModal() {
    const modal = await this.modalController.create({
      component: PersonneModalComponent,
      cssClass: 'personne-modal',
    });
    return await modal.present();
  }

  async openrdvModal() {
    const modal = await this.modalController.create({
      component: RendezvousmodalComponent,
      cssClass: 'work-hours-modal',
    });
    this.close
    return await modal.present();
  }
 
}


@NgModule({
  declarations: [WorkHoursModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [AngularFirestore],
})
export class WorkHoursModalModule {}

export let selectedHour: string ;
export let selectedDate: string ;
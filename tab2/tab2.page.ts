import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CalendarEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { deleteRendezVous, getRdvByPatientUid, medecinUid } from 'src/firebaseConfig';
import { ModalController } from '@ionic/angular'; // Importez le ModalController
import { inscritUid } from '../login/login.page';
import { ExcuseModalComponent, selectedExcuse } from './excusemodal/excusemodal.component';


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
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  uid: string = inscritUid;
  rdvs: RendezVousData[] = [];
 


  constructor(private firestore: AngularFirestore,  private modalController: ModalController) {
    this.loadEvents();
  }

  async loadEvents() {
    try {
      const rdvs = await getRdvByPatientUid(this.firestore, this.uid);
      if (rdvs && rdvs.length > 0) {
        this.events = rdvs.map(rdv => ({
          start: new Date(rdv.date), // Supposons que rdv.date contient la date du rendez-vous
          title: `
          Rendez-vous de ${rdv.prenom} ${rdv.nom} à ${rdv.heure} chez ${rdv.medecinPrenom} ${rdv.medecinNom}
          ${rdv.statut ? `<b><u><u><mark>${rdv.statut}</mark></u></u></b>` : ''} 
          ${rdv.excuse ? `<b><u><u><mark>${rdv.excuse}</mark></u></u></b>` : ''} 
        `
        
        }));
        this.rdvs = rdvs;
      }
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  async deleteRendezVouscalendar(rendezVous: RendezVousData) {
    try {
        // Demander une excuse via la modal
        const excuse = await this.presentExcuseModal();
        // Vérifier si une excuse a été fournie
        if (selectedExcuse !== undefined) {
            // Appeler deleteRendezVous avec l'excuse
            await deleteRendezVous(this.firestore, inscritUid, rendezVous, selectedExcuse);
            console.log('Rendez-vous supprimé avec succès.');
            await this.loadEvents();
        } else {
            console.log('Excuse non fournie. Annulation de la suppression du rendez-vous.');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du rendez-vous:', error);
    }
}

async presentExcuseModal(): Promise<string | undefined> {
  const modal = await this.modalController.create({
      component: ExcuseModalComponent,
  });
  await modal.present();
  return new Promise<string | undefined>((resolve) => {
      modal.onDidDismiss().then((result) => {
          const data = result?.data as { excuse: string };
          resolve(data?.excuse);
      });
  });
}


}

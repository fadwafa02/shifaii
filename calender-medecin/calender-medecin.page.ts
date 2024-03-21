import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { CalendarView } from 'angular-calendar';
import { deleteRendezVous, getRdvByMedUid } from 'src/firebaseConfig';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { medecinUid } from 'src/firebaseConfig';
import { ExcuseModalComponent, selectedExcuse } from './excusemodal/excusemodal.component';
import { ModalController } from '@ionic/angular';

interface RendezVousData {
  date: string;
  heure: string;
  nom: string;
  prenom: string;
  useruid: string;
  medecinNom?: string;
  medecinPrenom?: string;
  medecinuid: string;
  key: string;
  excuse?:string ;
  statut?:string;
}

@Component({
  selector: 'app-calender-medecin',
  templateUrl: './calender-medecin.page.html',
  styleUrls: ['./calender-medecin.page.scss'],
})
export class CalenderMedecinPage implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  uid: string = medecinUid.uid;
  events: CalendarEvent[] = [{ start: new Date(), title: 'An event' }];
  activeDayIsOpen: boolean = false;
  rdvs: RendezVousData[] = [];
  medecinuid = this.uid;

  constructor(private firestore: AngularFirestore, private modalController: ModalController) {
    this.loadEvents();
    console.log('meduid', medecinUid.uid);
  }

  ngOnInit() {}

  async loadEvents() {
    try {
      const rdvs = await getRdvByMedUid(this.firestore, this.uid);
      if (rdvs && rdvs.length > 0) {
        this.rdvs = rdvs;
        this.events = rdvs.map(rdv => ({
          start: this.convertDateTimeToDate(rdv.date, rdv.heure.split(' - ')[0]),
          end: this.convertDateTimeToDate(rdv.date, rdv.heure.split(' - ')[1]),
          title: `Rendez-vous de ${rdv.prenom} ${rdv.nom} à ${rdv.heure} chez ${rdv.medecinPrenom} ${rdv.medecinNom}`,
        }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
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
            await deleteRendezVous(this.firestore, medecinUid.uid, rendezVous, selectedExcuse);
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
        modal.onDidDismiss().then(({ data }) => {
            resolve(data?.excuse);
        });
    });
}






  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  private convertDateTimeToDate(dateString: string, timeString: string): Date {
    const dateParts = dateString.split('-').map(part => parseInt(part, 10));
    const timeParts = timeString.split('H').map(part => parseInt(part, 10));
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1]);
  }
}

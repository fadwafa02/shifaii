import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { AddMedecin } from  'src/firebaseConfig'; // Assurez-vous d'importer AddMedecin correctement
import {  ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';


@Component({
  selector: 'app-signup-medecin',
  templateUrl: './signup-medecin.page.html',
  styleUrls: ['./signup-medecin.page.scss'],
})
export class SignupMedecinPage implements OnInit {


  @ViewChild('specialiteSelect') specialiteSelect: IonSelect | undefined;
  selectedSpecialite: string | null = null;
 
  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;

  selectedState: string | null = null;
  selectedDelegation: string | null = null;


  
  // Déclarer la variable delegations en haut de votre fichier TypeScript
delegations: { [key: string]: string[] } = {
  Ariana: ['Ariana Ville', 'La Soukra', 'Raoued', 'Sidi Thabet'],
  Beja: ['Beja Nord', 'Beja Sud', 'Amdoun', 'Goubellat', 'Medjez el-Bab', 'Nefza', 'Teboursouk', 'Testour', 'Thibar'],
  BenArous: ['Ben Arous', 'Bou Mhel el-Bassatine', 'El Mourouj', 'Ezzahra', 'Fouchana', 'Hammam Chott', 'Hammam Lif', 'Mohamedia-Fouchana', 'Mornag', 'Radès'],
  Bizerte: ['Bizerte Nord', 'Bizerte Sud', 'Ghar el-Melh', 'Mateur', 'Menzel Bourguiba', 'Menzel Jemil', 'Ras Jebel', 'Sejnane', 'Tinja', 'Utique', 'Zarzouna'],
  Gabes: ['Gabès Médina', 'Gabès Ouest', 'Gabès Sud', 'Ghannouch', 'El Hamma', 'Mareth', 'Menzel Habib'],
  Gafsa: ['Gafsa Nord', 'Gafsa Sud', 'Belkhir', 'El Guettar', 'El Ksar', 'Mdhila', 'Métlaoui', 'Redeyef', 'Sidi Aïch'],
  Jendouba: ['Jendouba', 'Aïn Draham', 'Balta-Bou Aouane', 'Bou Salem', 'Fernana', 'Ghardimaou', 'Oued Meliz', 'Tabarka'],
  Kairouan: ['Kairouan Nord', 'Kairouan Sud', 'Bou Hajla', 'Chebika', 'El Alâa', 'Haffouz', 'Hajeb El Ayoun', 'Nasrallah', 'Oueslatia', 'Sbikha', 'Chrarda', 'Oulad Chamekh', 'Aïn Djeloula'],
  Kasserine: ['Kasserine Nord', 'Kasserine Sud', 'Fériana', 'Foussana', 'Hassi El Ferid', 'Hidra', 'Jedelienne', 'Majel Bel Abbes', 'Sbeitla', 'Thala'],
  Kebili: ['Kebili Nord', 'Kebili Sud', 'Douz Nord', 'Douz Sud', 'Souk Lahad'],
  LeKef: ['Le Kef Est', 'Le Kef Ouest', 'Dahmani', 'Jérissa', 'El Ksour', 'Sers', 'Tajerouine', 'Touiref'],
  Mahdia: ['Mahdia', 'Bou Merdès', 'Chebba', 'El Jem', 'Hbira', 'Ksour Essef', 'Ouled Chamekh', 'Teboulba'],
  LaManouba: ['La Manouba', 'Den Den', 'Douar Hicher', 'El Battar', 'Mornaguia', 'Oued Ellil', 'Tebourba'],
  Médenine: ['Médenine Nord', 'Médenine Sud', 'Ben Gardane', 'Beni Khedache', 'Djerba-Ajim', 'Djerba-Houmt Souk', 'Sidi Makhlouf', 'Zarzis'],
  Monastir: ['Monastir', 'Amiret El Fhoul', 'Bekalta', 'Bembla', 'Jammel', 'Ksar Hellal', 'Ksibet El Mediouni', 'Moknine', 'Ouerdanine', 'Sahline', 'Sayada-Lamta-Bou Hajar', 'Téboulbou'],
  Nabeul: ['Nabeul', 'Béni Khalled', 'Béni Khiar', 'Bou Argoub', 'Dar Chaabane El Fehri', 'El Haouaria', 'El Mida', 'Grombalia', 'Hammam Ghezèze', 'Hammamet', 'Kélibia', 'Korba', 'Menzel Bouzelfa', 'Menzel Temime', 'Soliman', 'Takelsa'],
  Sfax: ['Sfax Ville', 'Agareb', 'Bir Ali Ben Khélifa', 'El Amra', 'El Ghraiba', 'Jebeniana', 'Kerkennah', 'Mahres', 'Menzel Chaker', 'Sakiet Eddaïer', 'Sakiet Ezzit', 'Sfax Ouest', 'Thyna'],
  SidiBouzid: ['Sidi Bouzid Est', 'Sidi Bouzid Ouest', 'Bir El Hafey', 'Cebbala Ouled Asker', 'Jilma', 'Meknassy', 'Menzel Bouzaiane', 'Menzel Ennour', 'Ouled Haffouz', 'Regueb', 'Sidi Ali Ben Aoun'],
  Siliana: ['Siliana Nord', 'Siliana Sud', 'Bargou', 'Bou Arada', 'El Aroussa', 'Gaâfour', 'Kesra', 'Makthar', 'Rouhia'],
  Sousse: ['Sousse Médina', 'Sousse Riadh', 'Akouda', 'Bouficha', 'Enfidha', 'Hammam Sousse', 'Hergla', 'Kalâa Kebira', 'Kalâa Seghira', 'Kondar', 'M-saken', 'Sidi Bou Ali', 'Sidi El Heni', 'Zaouiet Sousse'],
  Tataouine: ['Tataouine Nord', 'Tataouine Sud', 'Bir Lahmar', 'Dehiba', 'Ghomrassen', 'Remada', 'Smar', 'Tataouine Dahar'],
  Tozeur: ['Tozeur', 'Degache', 'Hazoua', 'Nefta', 'Tamerza'],
  Tunis: ['Tunis Ville', 'Carthage', 'La Goulette', 'La Marsa', 'Sidi Bou Saïd', 'Le Bardo', 'Le Kram'],
  Zaghouan: ['Zaghouan', 'Bir Mcherga', 'Djebel Oust', 'Nadhour', 'Saouaf']
};


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





  familyName = "";
  name = "";
  email = "";
  password = "";
  date = "";
  sexe = "";
  localisation = "";
  specialite = "";
  role = "medecin";
  telephone = "";

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private toastController: ToastController
  ) { }

  onStateChange() {
    // Réinitialiser la délégation sélectionnée lorsque l'état change
    this.selectedDelegation = null;
  }

  saveSelectedSpecialite() {
    console.log('Spécialité sélectionnée : ', this.selectedSpecialite);
    // Vous pouvez utiliser la valeur sélectionnée comme vous le souhaitez
  }

  onFileSelected(event: any) {
    const file: File | null = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileUrl = URL.createObjectURL(this.selectedFile);
      console.log('URL de l\'image sélectionnée : ', this.selectedFileUrl);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  ngOnInit() {}

  async AddUser() {
    try {
      const file = this.selectedFile; // Utilisez selectedFile ici
      if (this.selectedSpecialite && this.selectedState && this.selectedDelegation) {
        await AddMedecin(
          this.firestore,
          this.storage,
          this.familyName,
          this.name,
          this.email,
          this.password,
          this.date,
          this.sexe,
          this.role,
          this.selectedDelegation,
          this.selectedState,
          this.selectedSpecialite,
          this.telephone,
          file
        );
        
        this.presentToast('Registration successful!');
        this.resetForm(); // Réinitialiser le formulaire après l'ajout réussi
      } else {
        console.error('Selected values are null');
        // Gérer le cas où les valeurs sélectionnées sont null
      }
    } catch(error) {
      console.log('Error during registration:', error);
      this.presentToast('Error during registration.');
    }
  }
  

  async uploadFile(file: File | null): Promise<string | null> {
    if (!file) return null;
    const filePath = `path/to/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = fileRef.put(file);
    return uploadTask.snapshotChanges().toPromise()
      .then(async () => await fileRef.getDownloadURL().toPromise())
      .catch(error => {
        console.error('Erreur lors du téléchargement du fichier :', error);
        return null;
      });
  }

  resetForm() {
    this.familyName = '';
    this.name = '';
    this.email = '';
    this.password = '';
    this.localisation = '';
    this.specialite = '';
    this.date = '';
    this.sexe = '';
    this.telephone = '';
    this.selectedFile = null;
  }
}
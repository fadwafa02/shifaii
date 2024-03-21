import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { auth, firestore, loginUser } from 'src/firebaseConfig';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private toastController: ToastController,private firestore: AngularFirestore, private router: Router ) { }
  /*async loginWithGenericAccount() {
    try {
      const genericCredential = await signInWithEmailAndPassword(auth, 'fedizz4@gmail.com', 'azerty');
      const genericUser = genericCredential.user;

      if (genericUser) {
        // L'utilisateur générique est connecté, exporter son UID si nécessaire
        const userUid = genericUser.uid;
        console.log('Utilisateur générique connecté :', genericUser);
      } else {
        console.log('Erreur lors de la connexion avec le compte générique');
        // Gérer l'erreur de connexion générique
      }
    } catch (error) {
      console.log('Erreur lors de la connexion :', error);
      // Gérer l'erreur de connexion générique
    }
  }
*/
  async loginUser() {
    try {
      const result = await loginUser(this.firestore ,this.email, this.password);
      if (result) {
        const { uid } = result;
        console.log('Connexion réussie ! Navigation vers la page d\'accueil de l\'utilisateur...');
        console.log('UID de l\'utilisateur :', uid);

        // Affectez la valeur de l'UID à la variable exportée inscritUid
        inscritUid = uid;

        this.router.navigate(['/tabs/tab1']);
      } else {
        console.log('Connexion échouée. Gérer les actions en cas d\'échec.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion de l\'utilisateur :', error);
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

  back() {
    this.navCtrl.navigateForward('/home-avant-compte');
  }

  ngOnInit() {
  }
}
export let inscritUid: string;


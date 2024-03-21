import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.signInWithEmailAndPassword('fedizz4@gmail.com', 'azerty')
      .then(userCredential => {
        // L'utilisateur est authentifié avec succès
        const user = userCredential.user;
        console.log('User authenticated:', user);
        // Ajoutez ici la vérification de l'utilisateur dans la base de données 'inscrit'
      })
      .catch(error => {
        // Une erreur s'est produite lors de l'authentification
        console.error('Error authenticating user:', error);
      });
  }
}
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-affiche-recette-pays',
  templateUrl: './affiche-recette-pays.page.html',
  styleUrls: ['./affiche-recette-pays.page.scss'],
})
export class AfficheRecettePaysPage implements OnInit {

  ApiUrl = '';
  selectedCountry: string = '';
  recipes: any = {
    results: [],
  };

  constructor(private http: HttpClient) { }

  readAPI(URL: string) {
    return this.http.get(URL);
  }

  searchRecipesByTitle() {
    const search = encodeURIComponent(this.selectedCountry).trim();
    console.log('Recherche de recette par pays ' + search);
    const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?cuisine=' + search + '&apiKey=73005697c67242ec9f2fab1ea8a0eb72';

    this.readAPI(apiUrl).subscribe((data: any) => {
      console.log(data);

      if (data.results && data.results.length > 0) {
        this.recipes.results = data.results;
      } else {
        console.error('Aucune recette trouvée dans les données JSON.');
        // Réinitialisez les propriétés de votre recipes si aucun résultat n'est trouvé.
        this.recipes.results = [];
      }
    });
  }

  ngOnInit() {
  }
}

let global_var_tokens = [];
let global_var_lines = [];

document.getElementById("helloButton").addEventListener("click", function() {
    let nom = document.getElementById("username").value;  
    alert("Bonjour " + (nom ? nom : "inconnu") + " !");
});
document.getElementById("helpButton").addEventListener("click", function() {
    alert("Il faut entrer son nom et cliquer sur le bouton. Ce n'est pas très compliqué, non?");
});
function exercice4() {
    let texte = document.getElementById("texteExercice4").value;
    let tokens = texte.split(" ");
    let table = document.createElement("table");
    tokens.forEach(mot => {
        let row = document.createElement("tr");
        row.innerHTML = mot;
        table.appendChild(row);
    });
    document.getElementById("exercice4Resultat").appendChild(table);
}

window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
        let file = fileInput.files[0]; // Récupère le premier fichier sélectionné
        let textType = new RegExp("text.*");

        if (textType.test(file.type)) { // Vérifie que le fichier est un fichier de type texte
            let reader = new FileReader(); // Déclare et initialise le FileReader
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;

                
                let text = reader.result; // Compte le nombre de tokens en segmentant le texte par les espaces
                let tokens = text.split(/\s+/); // Utilise une expression régulière pour séparer par espaces ou autres séparateurs
                let nbTokens = tokens.length; // Compte le nombre de tokens
                let nbLines = text.split('\n').length; // Compte le nombre de lignes

				global_var_lines = text.split('\n');
				global_var_tokens = tokens;
				
                document.getElementById("logger2").innerHTML = 
                    '<span class="infolog">Nombre de tokens : ' + nbTokens + '<br>Nombre de lignes : ' + nbLines + '</span>';
            }
            reader.readAsText(file);

            document.getElementById("logger3").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // Pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger1").innerHTML = 
                '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
};

function kujuj() {
    if (document.getElementById('fileDisplayArea').innerText == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
		} else {
			alert("c'est une plaisanterie !");
        let textContent = document.getElementById('fileDisplayArea').innerText;
        let tokens = textContent.split(/\s+/);
        let kujujTokens = tokens.map(token => token + "uj"); // Ajoute "uj" à chaque token
        let kujujText = kujujTokens.join(' '); // Reforme le texte
        document.getElementById('analyseOutput').innerHTML = kujujText;
    }
}

let SegmentButton = document.querySelector('#SegmentBtn');
if (SegmentButton) {
    SegmentButton.addEventListener('click', function() {
        let text = fileDisplayArea.innerText;
        let noPunctuation = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’‘«»]/g, ' '); // Cette ligne de code supprime toute forme de ponctuation
        let cleanedText = noPunctuation.replace(/\s+/g, ' ').trim(); // Cette ligne remplace les espaces multiples
        let words = cleanedText.split(' '); // Cette ligne segmente le texte
        let result = words.join(' '); // Cette ligne affiche le résultat
        analyseOutput.innerText = result;
    });
}

function nbPhrases() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        let text = document.getElementById("fileDisplayArea").innerText; // Nous avons accès au texte brut
        let phrase = /[.!?]/g; // Cette règle permet de trouver dans le texte les caractères qui sont soit un point, soit un point d'exclamation, soit un point d'interrogation
        let nbPhrases = text.split(phrase);  // La regex 'phrase' découpe le texte en fragments à chaque fin de phrase (Avec de la ponctuation donc)
        let resultat = nbPhrases.filter(x => x.trim() != "").length; // Les vides éventuels sont retirés, par exemple dans le cas des points de suspension
        document.getElementById('analyseOutput').innerHTML = '<div>Il y a ' + resultat + ' phrases dans ce texte.</div>';
    }
}


function grep() {
    // Vérifier si un fichier .txt a été chargé
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        // Afficher un message d'erreur
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
		} else {
            // Effacer tout message d'erreur précédent
			document.getElementById('logger3').innerHTML = "";
			// Récupérer la valeur du champ "pôle" avec l'id "poleID"
			let poleInput = document.getElementById("poleID").value;
            // Vérifier si un pôle a été saisi
			if (poleInput == "") {
            // Afficher un message d'erreur
            document.getElementById('logger3').innerHTML = "Il faut d'abord entrer un pôle !";
			} else {
                // Créer une expression régulière à partir de la valeur du champ "pôle"
				let poleRegex = new RegExp("(" + poleInput + ")", 'g');
                // Initialiser la variable "resultat" avec l'entête du tableau. Je n'arrivais pas à afficher un tableau comme sur les captures d'écrans alors j'ai ajouté des consignes
				let resultat = "<tr><th style='border:1px solid black;padding:4px;'>Ligne</th><th style='border:1px solid black;padding:4px;'>Résultat</th></tr>";
                // Parcourir chaque ligne du tableau "global_var_lines"
				for (let i = 0; i < global_var_lines.length; i++) {
                // Vérifier si la ligne correspond à la regex
                if (poleRegex.test(global_var_lines[i])) {
                // Ajouter le numéro de la ligne et le résultat correspondant au tableau "resultat"
                let lineNumber = i + 1;
                let highlighted = global_var_lines[i].replace(poleRegex, "<span style='color:red'>$1</span>"); // Force le pôle recherché à s'afficher en rouge
                    resultat += "<tr><td style='border:1px solid black;padding:4px;'>" + lineNumber + "</td><td style='border:1px solid black;padding:4px;'>" + highlighted + "</td></tr>";
                }
            }
            // Vérifier si des résultats ont été trouvés

            if (resultat == "<tr><th>Ligne</th><th>Résultat</th></tr>") {
                // Effacer les résulats précédent
                document.getElementById('analyseOutput').innerHTML = "";
                // Afficher un message d'erreur
                document.getElementById('logger3').innerHTML = "Aucune correspondance trouvée.";
				} else {
                    // Effacer tout message d'erreur précédent
					document.getElementById('logger3').innerHTML = "";
                    // Injecter le tableau résultant dans l'élément HTML
					document.getElementById('analyseOutput').innerHTML = "<table>" + resultat + "</table>";
            }
        }
    }
}

function tokenLong() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !"; // Indique à l'utilisateur qu'aucun fichier n'a été chargé
		} else {
			document.getElementById('logger3').innerHTML = ""; // Sinon, procéder vers l'étape suivante sans rien afficher
            // Trier le tableau 'global_var_tokens' par ordre décroissant de longueur et garder les X premiers éléments
			let tokenSort = global_var_tokens.sort((a, b) => b.length - a.length);

			// Convertir chaque token en une ligne HTML encadrée, sinon seules les entêtes des colonnes sont encadrées
			let map = tokenSort.map(token => '<tr><td style="border:1px solid black;padding:4px;">' + token + '</td><td style="border:1px solid black;padding:4px;">' + token.length + '</td></tr>').join('');

            //Tableau HTML
			let resultat = '<table style="border-collapse:collapse;">' + '<tr><th colspan=2 style="border:1px solid black;padding:4px;"><b>Mots les plus longs</b></th></tr>' + '<tr><th style="border:1px solid black;padding:4px;"><b>Mot</b></th>' + '<th style="border:1px solid black;padding:4px;"><b>Longueur</b></th></tr>' + map + '</table>';
            // Injecter le tableau dans l'élément HTML
			document.getElementById('analyseOutput').innerHTML = resultat;
			}
}

function dictionnaire() {
    if (document.getElementById('fileDisplayArea').innerHTML==""){ // Vérifie si un texte a été chargé
	
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !";
		} else {
			document.getElementById('logger3').innerHTML="";
			let tokenFreq = {}; // Un objet pour stocker les fréquences des tokens
			let tokens = global_var_tokens;
			tokens.forEach(token => tokenFreq[token] = (tokenFreq[token] || 0) + 1); // Remplit tokenFreq : chaque token devient une clé avec un compteur de fréquence
            // Convertir l'objet en tableau de paires clé-valeur
			let freqPairs = Object.entries(tokenFreq);
            // Trier le tableau par fréquence décroissante
			freqPairs.sort((a, b) => b[1] - a[1]); // Trie les paires selon la fréquence décroissante
			// Ajouter l'entête du tableau
			let tableArr = [['<b>Token</b>', '<b>Fréquence</b>']]; // Intitulé de la 2e colonne
            // Créer un tableau de tableaux contenant les tokens et leurs fréquences
			let tableData = freqPairs.map(pair => [pair[0], pair[1]]);
            // Concaténer les deux tableaux
			let finalTable = tableArr.concat(tableData); // Fusionne l'en-tête avec les données
            // Créer le tableau HTML à partir du tableau final
			let tableHtml = finalTable.map(row => '<tr>' + row.map(cell =>'<td style="border:1px solid black;padding:4px;">' + cell + '</td>').join('') + '</tr>'); // Crée les lignes HTML avec bordures
            // Afficher le tableau HTML dans la page
			document.getElementById('analyseOutput').innerHTML = '<table style="border-collapse:collapse;">' + tableHtml.join('') + '</table>';
    }
}

function concord() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
		} else {
			document.getElementById('logger3').innerHTML="";
			let poleInput = document.getElementById('poleID').value; // Récupère le pôle depuis un champ d’input
			if (poleInput == "") {
				document.getElementById('logger3').innerHTML = "Il faut d'abord entrer un pôle !"; // Remplace "XX!"
				} else {
					document.getElementById('logger3').innerHTML="";
					let lgInput = document.getElementById('lgID').value; //voir bouton "longueur" dans index.html
                    // Vérifier si une longueur a été saisi, et si > 0
					if (lgInput == "" || isNaN(lgInput) || parseInt(lgInput) <= 0) { 
					// Afficher un message d'erreur
						document.getElementById('logger3').innerHTML = "Il faut d'abord entrer une longueur > 0 !";
						} else {
                            // Récupérer le pôle et le convertir en regex
							let poleRegex = new RegExp("^" + poleInput + "$", "gi"); // le "i" indique de ne pas prendre en compte la casse, ^ et $ pour délimiter le mot
						  	//Récupérer la valeur de "lgInput" (longueur de contexte) et conversion en nombre entier
							let long = parseInt(document.getElementById('lgID').value); // Accès à la valeur entrée
						  	// Chercher le pôle et créer une liste de concordance avec la méthode Array.prototype.reduce()
						  	// On applique .reduce sur global_var_tokens. Le callback prend en paramètres acc : accumulateur initialisé à 0 ;  token : valeur courante ; i : index de la valeur courante
							let concordance = global_var_tokens.reduce((acc, token, i) => {
								// A chaque itération du callback on teste si le "poleRegex" correspond au token courant
								if (poleRegex.test(token)) {
									// Si oui, création du contexte gauche (cLeft) et droit (cRight)
									let cLeft = global_var_tokens.slice(Math.max(0, i - long), i).join(" ");
									let cRight = global_var_tokens.slice(i + 1, Math.min(global_var_tokens.length, i + long + 1)).join(" ");
									acc.push([cLeft, token, cRight]); // Ajout de (contexte gauche, pôle, contexte droit) à la liste acc, comme affiché sur le navigateur en cours
									}
									return acc;
									}, []); // '[]' initialise la liste vide qui accumule les résultats
								  // Afficher les résultat dans une table HTML
								let table = document.createElement("table"); // Création du tableau HTML
								table.innerHTML = "<thead><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr></thead>"; // En-tête complet

                concordance.forEach(([cLeft, pole, cRight]) => { // Crée une boucle sur chaque triplet
								  	// Insertion d'une nouvelle ligne dans la table
									let row = table.insertRow();
								  	// Ajouter les données à la ligne
									row.innerHTML = `<td style="border:1px solid black;padding:4px;">${cLeft}</td><td style="color:red;border:1px solid black;padding:4px;">${pole}</td><td style="border:1px solid black;padding:4px;">${cRight}</td>`; // Remplit la ligne avec les 3 colonnes formatées
									});

                             		// Vérifier si des résultats ont été trouvés
									if (table.innerHTML == "<thead><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr></thead>") {
	                                    // Effacer les résulats précédent
										document.getElementById('analyseOutput').innerHTML = "";
	                                    // Afficher un message d'erreur
										document.getElementById('logger3').innerHTML = "Aucune correspondance trouvée.";
										} else {
											// Effacer tout message d'erreur précédent
											document.getElementById('logger3').innerHTML = "";
                                           	// Injecter le tableau résultant dans l'élément HTML
											document.getElementById("analyseOutput").innerHTML = "";
											document.getElementById("analyseOutput").appendChild(table);
											}
									}
						}
			}
}

function pieChart() {
	if (document.getElementById('fileDisplayArea').innerHTML=="") {
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !"; // Affiche un message d’erreur si aucun fichier n'est chargé.
      } else {
        document.getElementById('logger3').innerHTML = ""; // Efface les messages précédents
        // Récupérer les stopwords
	    var stopwordInput = document.getElementById("stopwordID").value;
	    var stopwords = stopwordInput.split(","); // Divise la chaîne saisie par virgules pour faire un tableau de stopwords
	
	    // Filtrer les stopwords de global_var_tokens
	    var filteredTokens = global_var_tokens.filter(function(token) { // Ne garde que les tokens qui ne sont pas dans la liste des stopwords
	      return stopwords.indexOf(token) === -1;
	    });
	
	    // Compter le nombre d'occurences de chaque token dans "filteredTokens"
	    var count = {};
	    filteredTokens.forEach(function(token) {
	      count[token] = (count[token] || 0) + 1;
	    });
	
	    var chartData = [];
	    var sortedTokens = Object.keys(count).sort(function(a, b) {  // Trie les tokens par fréquence décroissante
	      return count[b] - count[a];
	    }).slice(0, 30); // Ne garde que les 30 tokens les plus fréquents
	    sortedTokens.forEach(function(token) {
	      chartData.push({
	        label: token,
	        y: count[token] // Transforme les 30 tokens triés en objets pour le graphique
	      });
	    }); 
	
	    // Creation du graphique CanvasJS
	    var chart = new CanvasJS.Chart("chartContainer", {
	      animationEnabled: true,
	      backgroundColor: "transparent",
	      title: {
	        text: "Mots les plus fréquents"
	      },
	      data: [{
	        type: "pie",
	        showInLegend: true,
	        legendText: "{label}",
	        indexLabelFontSize: 14,
	        indexLabel: "{label} - {y}",
	        dataPoints: chartData
	      }]
	    });
	
	    chart.render(); // Génère et affiche le graphique
	}
} // La fonction crée un graphique circulaire des 30 mots les plus fréquents après exclusion des stopwords

function ticificateur() {
    if (document.getElementById('fileDisplayArea').innerText == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        const text = document.getElementById('fileDisplayArea').innerText; // Récupère le texte du fichier chargé
        const debutPhrases = ["En fait", "Du coup", "En vrai", "J'ai envie de dire", "On va pas se mentir", "De base", "Tout ça pour dire que", "Bref", "Après je dis ça je dis rien mais", "Enfin voilà après", "Genre ouaiiiis euuuh"]; // Liste des phrases à ajouter au début de chaque phrase
        const apresVirgule = ["genre", "ben", "en mode", "du style"]; // Liste des mots à ajouter après chaque virgule
        const apresVerbe = ["grave", "carrément", "juste", "t'sais", "genre"]; // Liste des phrases à ajouter à la fin de chaque phrase
        // Fonction pour choisir aléatoirement un élément d'un tableau
        function randomChoice(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
        // Sépare le texte en phrases tout en gardant les séparateurs
        const sentences = text.split(/(\n|[.!?]\s+)/); // On utilise un regex pour capturer les délimiteurs de phrases
		// On transforme chaque phrase selon les règles définies
        const transformed = sentences.map((segment, index, array) => {
            if (segment.match(/(\n|[.!?]\s+)/)) return segment; // Si le segment est un séparateur, on le retourne tel quel
            if (index === 0 || array[index - 1].match(/[.!?]\s+/)) {
                segment = randomChoice(debutPhrases) + " " + segment.trim(); // Ajouter les tics de language en début de phrase
				}
            segment = segment.replace(/,/g, (match) => match + " " + randomChoice(apresVirgule)); // Ajouter les tics de langage après les virgules
            segment = segment.replace(/\b(j'ai|tu as|il a|nous avons|vous avez|ils ont|elles ont)\b/g, (match) => match + " " + randomChoice(apresVerbe)); // Ajouter les tics de langage après les verbes via une détection simplifiée
            return segment;
        });
        // Affiche le texte transformé dans un élément HTML, en préservant les retours à la ligne avec un <pre>
        document.getElementById('analyseOutput').innerHTML = '<pre style="white-space: pre-wrap;">' + transformed.join('') + '</pre>';
    }
}





function showHide_aide() {
	let div = document.getElementById("aide");
	let b = document.getElementById("button_aide").innerHTML;
  	if (div.style.display === "none") { // Si l'élément "aide" est caché
  		div.style.display = "block"; // Affiche l'élément "aide"
    	document.getElementById("button_aide").innerHTML = "Cacher l'aide"; // Change le texte du bouton
	} else {
		div.style.display = "none"; // Cache l'élément "aide"
    	document.getElementById("button_aide").innerHTML = "Afficher l'aide"; // Change le texte du bouton
	}
}

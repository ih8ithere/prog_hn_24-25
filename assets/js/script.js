document.getElementById("helloButton").addEventListener("click", function() {
    let nom = document.getElementById("username").value;  
    alert("Bonjour " + (nom ? nom : "inconnu") + " !");
});
document.getElementById("helpButton").addEventListener("click", function() {
    alert("Il faut entrer son nom et cliquer sur le bouton. Ce n'est pas très compliqué, non? Par exemple, vous vous appellez 'Théodulphe', et bien ça affichera 'Bonjour Théodulphe !'.");
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
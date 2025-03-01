document.getElementById("helloButton").addEventListener("click", function() {
    let nom = document.getElementById("username").value;  
    alert("Bonjour " + (nom ? nom : "inconnu") + " !");
});
document.getElementById("helpButton").addEventListener("click", function() {
    alert("Il faut entrer son nom et cliquer sur le bouton. Ce n'est pas très compliqué, non? Par exemple, vous vous appellez 'Théodulphe', et bien ça affichera 'Bonjour Théodulphe !'.");
});
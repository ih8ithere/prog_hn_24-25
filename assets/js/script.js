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

window.onload = function () {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');
    let segmentButton = document.getElementById('segmentButton');
    let analyseOutput = document.getElementById('page-analysis');

    fileInput.addEventListener('change', function(e) {
        let file = fileInput.files[0];
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }
            reader.readAsText(file);

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else {
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
    segmentButton.addEventListener('click', function() {
        let text = fileDisplayArea.innerText;
        let cleanedText = text.replace(/\s+/g, ' ').replace(/\n/g, ' ');
        let words = cleanedText.split(' ');
        let result = words.join(',');
        analyseOutput.innerText = result;
    });
};

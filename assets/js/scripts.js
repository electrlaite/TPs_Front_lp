function init() {
    let form = document.getElementById("gameForm");
    let reponse = Math.round(Math.random() * 100);
    console.log(reponse);
    let nbVies = 5;
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let val = document.getElementById("reponse").value;
        if (val == reponse) {
            alert("Bien joué")
        } else {
            nbVies--;
            if (nbVies == 0) {
                alert("Perdu !");
                location.reload();
            } else {
                alert("Non !, il vous reste " + nbVies + " vies !");
            }
        }
    })
}
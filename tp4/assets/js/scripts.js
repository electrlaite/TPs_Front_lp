let destinations = [
    {
        "Ville": "Paris",
        "Image": "assets/images/paris.webp",
        "Description": "Visite de la tour effeil et dégustation de macarons.",
        "Price": 1000
    },
    {
        "Ville": "Grenoble",
        "Image": "assets/images/grenoble.jpg",
        "Description": "Visite de tout les meilleurs bars de la ville, ainsi que la bastille.",
        "Price": 15000
    },
    {
        "Ville": "Lisbonne",
        "Image": "assets/images/lisbonne.webp",
        "Description": "Visite de la ville et plage.",
        "Price": 400
    },
    {
        "Ville": "Athènes",
        "Image": "assets/images/athenes.webp",
        "Description": "Tour de la ville et visite des monuments historiques.",
        "Price": 1500
    },
    {
        "Ville": "Budapest",
        "Image": "assets/images/budapest.webp",
        "Description": "Tour de la ville et visite du parlement. Thermes l'aprés midi.",
        "Price": 800
    }
];

var isAdmin = false;

function reserver(ville){
    alert('La destination ' + ville + ' est indisponible.');
}

function deleteElem(i){
    destinations.splice(i,1);
    printDestinationTable();
}

function edit(i){
    let dest = destinations[i];
    $('#addComponentForm input[name="ville"]').val(dest.Ville);
    $('#addComponentForm input[name="img"]').val(dest.Image);
    $('#addComponentForm input[name="desc"]').val(dest.Description);
    $('#addComponentForm input[name="price"]').val(dest.Price);
    $('#addComponentForm input[name="indexEdit"]').val(i);
}

function printDestinationTable(){
    let i = 0;
    $('#destinationsTables').html('');
    destinations.forEach(function (destination) {
        let card = '<div class="col-lg-3 col-md-6 col-sm-12"><div class="card h-100">\n' +
            '  <img src="' + destination.Image + '" class="card-img-top" alt="Image de ' + destination.Ville + '">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title">' + destination.Ville + '</h5>\n' +
            '    <h6>' + destination.Price + '€</h6>' +
            '    <p class="card-text">' + destination.Description + '</p>\n' +
            '  </div>\n' +
            '<div class="card-footer">' +
            '<button class="btn btn-primary" onclick="reserver(\'' + destination.Ville + '\'")>Réserver</button>' +
            (isAdmin ? '    <button class="btn btn-secondary" onclick="edit(' + i + ')">Modifier</button>' +
            '    <button class="btn btn-danger" onclick="deleteElem(' + i + ')">Supprimer</button>' : '') +
            '</div>' +
            '</div></div>';
        i++;
        $('#destinationsTables').append(card);
    });

}

$( document ).ready(function() {
    if($('#destinationsTables').length){
        printDestinationTable();

        $('#addComponentForm').on('submit', function (e){
            e.preventDefault();
            let data = new FormData(this);
            console.log(data);
            let obj = {
                "Ville": data.get('ville'),
                "Image": data.get('img'),
                "Description": data.get('desc'),
                "Price": data.get('price')
            };
            let editPos = parseInt(data.get('indexEdit'));
            if(editPos > -1 && editPos < destinations.length){
                destinations[editPos] = obj;
            }
            else{
                destinations.push(obj);
            }

            $(this).find('input').val('');
            $('#addComponentForm input[name="indexEdit"]').val('-1');
            printDestinationTable();
        });
    }
    $.get('header.html', function (data){
        $('body').prepend(data);
        var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        $('#loginForm').on('submit', function(e){
            e.preventDefault();
            let data = new FormData(this);
            let loginPage = "http://localhost/frontTp/login.php";
            console.log(data.get('login'));
            $.ajax({
                url: loginPage,
                method: "POST",
                data: data,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    if(data == 'Failed' || data == 'No credentials'){
                        $('#loginForm input').addClass('is-invalid');
                    }
                    else{
                        isAdmin = (data == "admin");
                        alert('connecté en ' + data);
                        loginModal.hide();
                        printDestinationTable();
                    }
                }
            });
        });
    });
});
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
    let table = '' +
        '<table class="destinations">\n' +
        '            <thead>\n' +
        '            <tr>\n' +
        '                <th>Ville</th>\n' +
        '                <th>Image</th>\n' +
        '                <th>Offre</th>\n' +
        '                <th>Tarif</th>\n' +
        '                <th>Action</th>\n' +
        '            </tr>\n' +
        '            </thead>\n' +
        '            <tbody>\n';

    destinations.forEach(function (destination) {
        table += '' +
            '           <tr>\n' +
            '                <td>' + destination.Ville + '</td>\n' +
            '                <td><img src="' + destination.Image + '" width="300px" alt="' + destination.Ville + '"></td>\n' +
            '                <td>' + destination.Description + '</td>\n' +
            '                <td>' + destination.Price + '€</td>\n' +
            '                <td><button onclick="reserver(\'' + destination.Ville + '\')">Réserver</button><br><button onclick="deleteElem(' + i + ')">supprimer</button><br><button onclick="edit(' + i + ')">Edit</button></td>\n' +
            '            </tr>';
        i++;
    });

    table += '' +
        '            </tbody>\n' +
        '        </table>';
    $('#destinationsTables').html(table);
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
    });
});
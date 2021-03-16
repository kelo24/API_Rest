var respuesta;

function req() {
    var url = 'http://localhost:3000/api/wondersworld';
    // var respuesta;
    
    var table = document.getElementById('tbody');

    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            
            respuesta = JSON.parse(this.responseText);
            console.log(respuesta);

            for (var i = 0; i <= respuesta.length; i++){

                var id = respuesta[i].id;
                var name = respuesta[i].name;
                var location = respuesta[i].location;
                var cover = respuesta[i].cover;
                var geo = `${respuesta[i].geo.lat}, ${respuesta[i].geo.lon}`;
                var year = respuesta[i].year;
                var web;

                if (respuesta[i].web.oficial == 'The oficial web is not defined.') {
                    web = respuesta[i].web.wiki;
                } else {
                    web = respuesta[i].web.oficial;
                }

                table.innerHTML += `
                    <tr class="row align-items-center">
                        <th scope="row" class="col-1 align-left">${id}</th>
                        <td class="col-2 align-left"><a href="${web}" target="_blank">${name}</a></td>
                        <td class="col-3 align-center">${location}</td>
                        <td class="col-1 align-center">${year}</td>
                        <td class="col-5 align-center"><img title="Coordenadas: ${geo}" src="${cover}" alt="${name}">
                        </td>
                    </tr>`;
            }
            
        } else {
            console.log('Error detectado');
        };

    };

    http.open('GET', url, true);
    http.send();
};

document.addEventListener('DOMContentLoaded', req, false);
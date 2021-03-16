function req() {
    var url = 'http://localhost:3000/api/wondersworld';

    var http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {
            
            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            
        } else {
            console.log('Error detectado');
        }
    };

    http.open('GET', url, true);
    http.send();
};

document.addEventListener('DOMContentLoaded', req, false);
/*
* Autor : Israel Ortiz de Zárate 
*/

//Función que genera el mapa en de Gmaps. Se apoya para ello en la libreria gmaps.js y en maps.css

function generarMapa(coord) {
GMaps.geocode({
  address: coord,
  callback: function(results, status){
    if(status=='OK'){
      var latlng = results[0].geometry.location;
      map.setCenter(latlng.lat(), latlng.lng());
      map.addMarker({
        lat: latlng.lat(),
        lng: latlng.lng()
      });
    }
  }
});
}

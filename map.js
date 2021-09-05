const script = document.createElement('script');
script.async = true;
script.src = `https://maps.googleapis.com/maps/api/js?key=${config.MAP_API_KEY}&callback=initMap&libraries=&v=weekly`
document.body.appendChild(script);
let markers = [];

//populate data
function poplulateData (){
  if(allData.length !== 0){
    allData.map((business) => {
      const element = {
        coords: { lat: business.coordinates.latitude, lng: business.coordinates.longitude },
        content: `
        <a href="#${business.id}">
        <h1>${business.name}</h1>
        <p>${business.location.display_address.join(', ')}</p>
        <p>${business.display_phone}</p>
        </a>
        `,
        id: business.id
      }
      markers.push(element);
    });

  console.log(markers);
}}


async function initMap() {
  markers = [];
  await poplulateData();

  let options = {
    zoom: 12,
    center: markers[0].coords
  }

  //Set map
  const map = new google.maps.Map(document.getElementById("map"), options);

  for(let marker of markers){
    addMarker(marker);
  }

  const infoWindow = new google.maps.InfoWindow();

  //Add marker function
  function addMarker(props){
    const marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: './bubble-tea.png'
    });

    if(props.content){
      marker.addListener('click', function() {
        infoWindow.setContent(props.content);
        infoWindow.open(map, marker);
      });
    }
  }

  const targetMarker = new google.maps.Marker({
    position: markers[markerIndex].coords,
    map: map,
    icon: './bubble-tea.png'
  })

  infoWindow.setContent(markers[markerIndex].content);
  infoWindow.open(map, targetMarker);

  targetMarker.addListener('click', function(){
    infoWindow.setContent(markers[markerIndex].content);
    infoWindow.open(map, targetMarker);
  });
}


function openInfoWindow() {
  let options = {
    zoom: 12,
    center: markers[0].coords
  }

  //Set map
  const map = new google.maps.Map(document.getElementById("map"), options);

  const infoWindow = new google.maps.InfoWindow();

  const targetMarker = new google.maps.Marker({
    position: markers[markerIndex].coords,
    map: map,
    icon: './bubble-tea.png'
  })

  infoWindow.setContent(markers[markerIndex].content);
  infoWindow.open(map, targetMarker);

}
// // @ts-nocheck

// import mapboxgl from 'mapbox-gl';

// /* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
// mapboxgl.workerClass =
//   require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
// /* eslint-enable import/no-webpack-loader-syntax, import/no-unresolved */

// import React from 'react';
// import axios from 'axios';

// mapboxgl.accessToken =
//   'pk.eyJ1Ijoiam9uZXN4ZGQiLCJhIjoiY2xiaWQwOTZzMHltYTNvbGF3NGhubnNvNSJ9.4-kp_t7qhcH1rpVZSpuupg';

// const MapPage = () => {
//   const mapContainer = React.useRef<any>(null);
//   const map = React.useRef<any>(null);
//   const [lng, setLng] = React.useState(-70.9);
//   const [lat, setLat] = React.useState(42.35);
//   const [zoom, setZoom] = React.useState(9);

//   React.useEffect(() => {
//     axios.get('ip-api.com/json/24.48.0.1').then(function (response) {
//       setLat(response.data.lat);
//       setLng(response.data.lng);
//     });
//   }, []);

//   React.useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: [lng, lat],
//       zoom: zoom,
//     });
//   });

//   return (
//     <div>
//       <div ref={mapContainer} className="map-container" />
//     </div>
//   );
// };

// export default MapPage;

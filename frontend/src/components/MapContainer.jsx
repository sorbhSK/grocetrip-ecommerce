import React, { useEffect } from "react";

const MapContainer = ({ setSearchValue, searchValue, setSearchedInfo }) => {
  useEffect(() => {
    const initAutocomplete = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: "roadmap",
      });

      const input = document.getElementById("pac-input");
      const searchBox = new window.google.maps.places.SearchBox(input);

      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      let markers = [];

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];

        const bounds = new window.google.maps.LatLngBounds();

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
          console.log("object=", place);
          const tosetSearched = {
            city: place.address_components[0].long_name,
            state: place.address_components[3].long_name,
            country: place.address_components[4].long_name,
          };
          setSearchedInfo(tosetSearched);
          const icon = {
            url: place.icon,
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(25, 25),
          };

          markers.push(
            new window.google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
            })
          );
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    };

    window.initAutocomplete = initAutocomplete;

    // Load the Google Maps JavaScript API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDmuAiCyp_op90BX5Mq0azVaMZ9zKGrDI4&libraries=places&callback=initAutocomplete`;

    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <input
        id="pac-input"
        type="text"
        placeholder="Search"
        style={{ width: "300px" }}
        className="form-control MapInput"
        value={searchValue} // Bind the value to the state
        onChange={(e) => setSearchValue(e.target.value)} // Handle changes
      />
      <div id="map" style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default MapContainer;

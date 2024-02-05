var eqMap = L.map('mapDiv');
eqMap.setView([34.05645525224816, -118.27170702462467], 5);
L.esri.basemapLayer('DarkGray').addTo(eqMap);

// use panes to control the order that layers are displayed
eqMap.createPane('plates');
var plates = L.esri.featureLayer({
  url: 'https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/plate_tectonics_boundaries/FeatureServer/0',
  pane: 'plates'
});
plates.addTo(eqMap);

// used smaller dataset for this map because the historical quakes layer was taking much too long to load
eqMap.createPane('recentquakes');
var recentquakes = L.esri.featureLayer({
  url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/USGS_Seismic_Data_v1/FeatureServer/0',
  pane: 'recentquakes'
});
recentquakes.addTo(eqMap);

recentquakes.bindPopup(function (layer) {
  return L.Util.template(
    "Magnitude {mag} {eventType} hit {place} on (date I don't know how to format) at a depth of {depth} km.",
    layer.feature.properties
  );
});

// want to add a legend, but can't find doc or examples
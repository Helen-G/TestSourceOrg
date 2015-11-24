// config settings for the TaxParcelViewer application
// change the service urls and other properties to work with your GIS server.

function setConfigProperties(){
  
  var server = checkVal("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/");           // url for server rest services directory, ends with "/"
  var folder = checkVal("TaxParcel/");                                      // url for server subFolder, normally "TaxParcel/", ends with "/"

  //industryMapServiceStr = server + folder + "TaxParcelBaseMap/MapServer";   // service for industry map
  //consumerMapServiceStr = server + folder + "PublicAccessBaseMap/MapServer";// service for consumer map
  industryMapServiceStr = server + folder + "IndustryFocusedPublicAccessMap/MapServer";   // service for industry map
  consumerMapServiceStr = server + folder + "ConsumerFocusedPublicAccessMap/MapServer";// service for consumer map
  queryLayerStr         = server + folder + "TaxParcelQuery/MapServer/0";   // service for query layer (popup)
  searchLayerStr        = server + folder + "TaxParcelQuery/MapServer";     // service for find task (search box)
  parcelLayerNum = 0;                                                       // layer number for find task (search box)

  spRef =  new esri.SpatialReference({
    wkt : "PROJCS[\"NAD_1983_StatePlane_Michigan_South_FIPS_2113_IntlFeet\",GEOGCS[\"GCS_North_American_1983\",DATUM[\"D_North_American_1983\",SPHEROID[\"GRS_1980\",6378137.0,298.257222101]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Lambert_Conformal_Conic\"],PARAMETER[\"False_Easting\",13123359.58005249],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",-84.36666666666666],PARAMETER[\"Standard_Parallel_1\",42.1],PARAMETER[\"Standard_Parallel_2\",43.66666666666666],PARAMETER[\"Latitude_Of_Origin\",41.5],UNIT[\"Foot\",0.3048]]"
  });

  startExtent = new esri.geometry.Extent(13390094, 375295, 13450548, 410878,spRef);
  fields = {
    SiteAddress : "SITEADDRESS", 
    LowParcelID : "LOWPARCELID", 
    ParcelID : "PARCELID", 
    UseDescription : "USEDSCRP",  
    SubOrCondo : "CNVYNAME",
    Building : "BUILDING", 
    Unit : "UNIT", 
    TaxDistrict : "CVTTXDSCRP", 
    SchoolDistrict : "SCHLDSCRP", 
    OwnerName : "OWNERNME1", 
    // URL : "URL"
    FloorArea : "RESFLRAREA", 
    StructureType : "RESSTRTYP", 
    AssessedValue : "CNTASSDVAL", 
    TaxableValue : "CNTTXBLVAL", 	
    CurrentTaxes : "TOTCNTTXOD" 
  };
  // this is the primary key field for the tax parcel layer
  // these 2 fields are shown in the search results window on the left hand side of the app
  keyField = fields.ParcelID;
  addressField = fields.SiteAddress;
}

function setLayoutProperties(){
  // should not need to change these properties unless you make changes to the popup
  infoWindowWidth = 330;
  infoWindowHeight = 270;
  // the app will zoom to the feature extent + and - the addExtent in map units
  addExtent = 600;
}
function checkVal(strUrl){
  // check that the server URL paths end with a "/", add it if not present
  var strLen = strUrl.length;
  if( strUrl.substring(strLen-1,strLen) != "/"){
    alert(strUrl + " in config.js is missing '/' at the end of the string, automatically added");
    strUrl = strUrl + "/";
  }
  return(strUrl);
}
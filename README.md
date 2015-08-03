#OAuth wrapper for ArcGIS on Meteor [![Build Status](https://travis-ci.org/zxwandrew/meteor-arcgis.svg?branch=master)](https://travis-ci.org/zxwandrew/meteor-arcgis)

##Installation

`meteor add zxwandrew:arcgis`

##Configuration:

```
//Server Side
ServiceConfiguration.configurations.update(
{ "service": "arcgis" },
{
$set: {
  "clientId": "XXX",
  "secret": "XXX"
}
},
{ upsert: true }
);
```

##Usage
```
var options={
  showDialog: true
};

Arcgis.requestCredential(options, function(aToken) {
  console.log(aToken);
});
```

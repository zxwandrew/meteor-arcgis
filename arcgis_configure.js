Template.configureLoginServiceDialogForArcgis.helpers({
  siteUrl: function(){
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForArcgis.fields = function(){
  return[
    {property: 'clientId', lable: 'Client ID'},
    {property: 'secret', label: 'Client secret'}
  ]
}

Package.describe({
  name: 'zxwandrew:arcgis',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'An OAuth wrapper for ArcGIS Developer on Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/zxwandrew/meteor-arcgis',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  api.use(['random', 'templating'], 'client');

  api.imply('service-configuration', 'server');

  api.export('Arcgis');

  api.addFiles(['arcgis_configure.html', 'arcgis_configure.js'], 'client');
  api.addFiles('arcgis_common.js', ['client', 'server']);
  api.addFiles('arcgis_server.js', 'server');
  api.addFiles('arcgis_client.js', 'client');


});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('zxwandrew:arcgis');
  api.addFiles('arcgis-tests.js');

  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  api.use(['random', 'templating'], 'client');

  api.imply('service-configuration', 'server');

  api.export('Arcgis');

  api.addFiles(['arcgis_configure.html', 'arcgis_configure.js'], 'client');
  api.addFiles('arcgis_common.js', ['client', 'server']);
  api.addFiles('arcgis_server.js', 'server');
  api.addFiles('arcgis_client.js', 'client');
});

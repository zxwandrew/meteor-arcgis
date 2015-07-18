Arcgis.requestCredential = function(options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({
    service: 'arcgis'
  });
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    return;
  }

  // Force the user to approve the app every time (similar to Google's `approval_prompt`).
  var showDialog = options.showDialog || true;

  var credentialToken = Random.secret();
  var loginStyle = OAuth._loginStyle('arcgis', config, options);

  var loginURL = 'https://www.arcgis.com/sharing/oauth2/authorize'+
  '?response_type=code'+
  '&client_id='+config.clientId+
  '&redirect_uri='+OAuth._redirectUri('arcgis', config)+
  '&state='+ OAuth._stateParam(loginStyle, credentialToken);

  OAuth.launchLogin({
    loginService: 'arcgis',
    loginStyle: loginStyle,
    loginUrl: loginURL,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken
  });
};

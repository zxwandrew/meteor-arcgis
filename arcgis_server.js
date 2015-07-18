var OAuth = Package.oauth.OAuth;

OAuth.registerService('arcgis', 2, null, function(query){
  var response = getTokens(query);
  var refresh_token = response.refresh_token;

  console.log("asdfsadf"+refresh_token)

  var serviceData = {
    access_token: response.access_token,
    expires_in: (+new Date) + (1000 * response.expires_in)
  };

  if(refresh_token){
    serviceData.refresh_token = refresh_token;
  }

  return{
    serviceData: serviceData
  }

});


var isJSON = function (str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};


var getTokens= function(query){
  var config = ServiceConfiguration.configurations.findOne({service: 'arcgis'});
  if(!config)
    throw new ServiceConfiguration.ConfigError();

    console.log(OAuth._redirectUri('arcgis', config))

    var response;
    try{
      response = HTTP.post("https://www.arcgis.com/sharing/rest/oauth2/token/", { params:{
        client_id: config.clientId,
        client_secret: OAuth.openSecret(config.secret),
        redirect_uri: OAuth._redirectUri('arcgis', config),
        grant_type: 'authorization_code',
        code: query.code

      }});
    }catch(err){
      throw _.extend(new Error("Failed"),{response: err.response})
    }
    if (isJSON(response)){
      throw new Error("failed to complete")
    }else if(! JSON.parse(response.content).access_token){
      throw new Error("no access token")
    }else{
      jsoncontent = JSON.parse(response.content);
      return{
        access_token: jsoncontent.access_token,
        refresh_token: jsoncontent.refresh_token,
        expires_in: jsoncontent.expires_in
      };
    }
  //var response;
  //try{
    //var response =
    // HTTP.post("https://www.arcgis.com/sharing/rest/oauth2/token/", { params:{
    //   client_id: config.clientId,
    //   client_secret: OAuth.openSecret(config.secret),
    //   redirect_uri: OAuth._redirectUri('arcgis', config),
    //   grant_type: 'authorization_code',
    //   code: query.code
    //
    // }
    // }, function(error, result){
    //   if(error){
    //     console.log("error", error);
    //   }
    //   if(result){
    //     console.log(result)
    //     if(isJSON(result)){
    //
    //     }else if(!result.access_token){
    //
    //     }else{
    //       return{
    //         access_token: result.access_token,
    //         refresh_token: result.refresh_token,
    //         expires_in: result.expires_in
    //       }
    //     }
    //
    //
    //   }
    // });
  //}
};

Arcgis.retrieveCredential = function(credentialToken, credentialSecret){
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
}

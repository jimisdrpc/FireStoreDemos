const admin = require('firebase-admin');

exports.serviceAccount = {
  "type": "service_account",
  "project_id": "angular-firebase-auth0-3c084",
  "private_key_id": "6ba2ba41e0bf3837841aa9772c7d880b7ce3be81",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnkeTtRYEtJSNs\nBQT6FltUXZJWcz0w1VTx9LUpBJtU3y7PMmeatHZeAOcnkNwQuJ4B1eN/NPSxHzXm\ncIwTO3CNLRIhQSHWl+npXIagOO2JZtbJcN6bDrJt4iFEI0ORIIy7lAB1/3Y7lRu8\nj2+H+WTLEjUqsbLjWNoRgTiC8PgCHptrz8l8jJSFKERSSu6oIb+qJIZEBGnXd3bp\nkEIL9MJWHALtIIBzKAbgizDACG9x8IkXa8LlgWFQPM+cl+dGlcS5ks64znzSrH5Z\nNa7KjO2knBr13+W3axES4Q4hCva76z8zEO3kYdWph+VvVPC8FkSBsvIUWGsoaJUl\nlu2d8uQXAgMBAAECggEABr9iN4e39uhq77uYArYJwXDvJpoHWcMNY5zV+qvb0WQX\nT3KZJ2qi5ZAlvrsfkXDNtAc33PR18ffuxLO9gDzBgH3TIBGuWiTN337BUQxZzFGe\nzofD/vxthO05J7Q/0UU9RYRlLFs4GJgdgM9Jz3DkdSTrjSeQq4T1awUIEIXBhtxB\n9ujR7YwYmnhHAN9QbpF8YGHoQGWgVWdvaxDvP5lJYQjWSlGmiJqYCj720yziHwKB\nnd9Luht8Oyp5jp06tboQFNQY0m+DDMsSbgMoeQRRTrvMQ/Ah2U3UnRfftfpIO9tM\n9neaDJEum7t4JyGc6oLvyRS2J2tHiVKfOPLgkkal4QKBgQDWxnihrp9uDjEYbIDe\nAvbSbGqI5iHb0suqOLXkLY6WxPrpct218jEouiw2uEWQSlpApYR8cVzKsh+87ns4\nVOlfIp8T4aKHHpKom2gSWB8if52yfWImQHGyhnzmXg/2GwDszLOsai8mScBaP+CS\nbq0Wj4tg7sPE+5P4H+kbk1rWsQKBgQDHu93pyBqI3xCjZSDCX1S96i0r/1DHu/BN\nqSe/Tvi/wvg6cdO7oxklRWmj+Nm8iKEvFut8QM5RGQyb1q5z3xH7LyNMAetOb0+/\ntnh9SnuJd1eOnqxU6MszxqUSVm5SlebY35FMU198Kb1Fq6VBSQ9SnNZyYhIVMGeG\ndhmLTw8pRwKBgQCPbZ9lqe4CWyviOaOdn7EhORG0Nqtp18328URXCy1r9kPx3qm9\nNe4qWpnoOQsLnvvCrEZbrIDhRC75xvE2302yILbHWillvr8GJjJL/dlc+ohfiGgh\nT2weYr3KQgq6ubHWcaWTgJ3YHex82KeqYoroxBe6Nfk69R8N1pGfvrotIQKBgESN\nAQwExr6lOJOr2MN9bptD7T8FgNccdMxiuyaY1x0RsJp2iMIEp1O4cBp8BVcE2bVM\nu4PIxkblPwOZegSA0i4Qrp+epQEliQx2dwIhdybmE+H6KZF22I8rpWoWygSEOFfE\n25yDnOkDdlecIrq2dZDYDW3ypNwq4c0vaXL7rmtvAoGAaX9/bC9irdkZ8U9GaOrs\n+n+uYQTJSJPM7Tvgfssa8X1KK09zoj2f7ZLvcjGzl/VF2D7uf23VtAL2RZsB7z14\ny4rnDCc4Rx7nslGUk6kwEz+xJYUpP96rkp5iv/qUuoveJdI/NogJjgUtvRUa2evA\ntg2PV9xsYvkt8+8Ce79fYKA=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
  "client_email": "firebase-adminsdk-lu97a@angular-firebase-auth0-3c084.iam.gserviceaccount.com",
  "client_id": "114324662014690107039",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lu97a%40angular-firebase-auth0-3c084.iam.gserviceaccount.com"
}

 admin.initializeApp({
   credential: admin.credential.cert(exports.serviceAccount)
});

var uid = "NSBFu2YJNDgLQJCZ99dRJlP4DRo2"; //copied from https://console.firebase.google.com/project/firetestjimis/authentication/users
var claim = {
  control: true
};
admin.auth().createCustomToken(uid)
  .then(function (customToken) {
    console.log(customToken)
  })
  .catch(function (error) {
    console.log("Error creating custom token:", error);
  });

const admin = require('firebase-admin');

exports.serviceAccount = {
  "type": "service_account",
  "project_id": "firetestjimis",
  "private_key_id": "ecfc68dcc216b3a778ca22a086e7e6661fd05923",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDcgGlM3r7aytMX\ncl6O2E+wzfqTNvs9GzNHDIXpYg4lK3q3D9RTR/HxkddwO6YLEhSXKOK5L74mJPP/\ncUM5uMUF4bFmjIblbtSxoSjo+2fsGqxM2DV99qw/iacsmsKhiUBp7SzgeVhKoN3x\nz+EgvfMxRAMrDchjYZnUUt+2pU7QhGu5BP/eg2dn1ZSKmIqHLvxkkQi2X6oK2h+X\nKPe6vurpsOOnillPUNv0w1yvyYoBnDKF3IrpZRB+Ziu1NKrhOCpvb0GqQ20XCz5I\nquTawNmTC2kd7rtw4OSU6mr8Sp16VUfbE/hoj+w6Yn3MveU1PvK4h2P5DV/0H4xe\nrQkT6+hpAgMBAAECggEAMQlToZc1rXWGrUOveKftTP35uCx1gfjfFfFYhHbce3Ko\nZzabeuvYh+btmNWDDxo1vwoGJbXS3SvBoXCgSSFom26+I3aj9zkHDvuum+VxDoY+\nBBbfCoTFeJnVtisylnbt/sCShtclhe8xfHnE8KGdiDq+U6BMjKFjct79RmKL3P30\nQke1gsTjPrQeGWD7foKd/lSj5eaZeyeZcbauNG167NvoNSLVJC0+5SWc5LkdFbgC\n/nYSfJmliNlS+oabGgYl4xHdbIhsgecBNaXID8FfmeN1ZmmJv1n+YUkpgA263jOx\ntolnsshtGWE/wPYQDNro0hH7xhBDrB4/0D7qCN8A2wKBgQDwd/xKAQavEmIQttCs\nUuOsf9ugFLnN4qE7GX+uG+Bv3ZvLYawhth99iME61hELc3D6aZ6YFdkNTCLOLD3R\ndS5Zs5HccL1zwYNxcgl4VAsTjWQME5J8v+7StARXczIvDcngiIXIcpz2FMHqXccm\n/FtVItzqxoDaJHmf2PL9Ymg3cwKBgQDqvkgCYN2m32ZYP64+NJvAJtjVSY9RRovy\nUVfArHqHsB/KamcCCLSslnQuOlPghtMyli0xSMFdE33ry8Vd3jk5g3ocGozeE45w\nDstowgTn8bLvBBu54n3z7OdTwgTxxpTNZaD8iT8QSXidBSxr2BtqjxLfkKS/1sNo\naGppAIeRswKBgBSxvrx/qhuW8WmO0haCa6WEu1njbroRLt7vKtXJAF+gKrAuD6o3\nCi67fiWaFo1tueNTA5sDBlLmongrxoYoF30QvxTBfwxfMvioX7hDQ1DDckC3znt9\n6QepBlagS0lRXnY8SYcelfN3hditiV4JibKh9XEe9CfRy8W93euAdIeRAoGAEJOn\nWiOlA2e7PnggwdvNM+CKZ2VubXrh3xbHb5++d16EoDKrW4Vp3NYzFiCgU7axq1zX\njCdrIDuEJOaa5WoP+HPEZ7+oOvZ+lIM28grhdc+npyFPI+1On68XFt8Yoko3r9mB\naNP4VBocHlqDLIpyRTAdURRRzgpIelMFUKzs5ekCgYA4+m1U1xYN5K3p6OvWsWp2\nhiGNiC2qm0LMiUSmWo7XjHl7TfuOTtA9L96JEbRj9pBiDpMBOWJ/IjBsDJ9qluNQ\nx0RlHIvtRTe0qKjlWWGNlYsJYgwSmwDcFk5GcIw/0yJ1bWKD6nTlKDBxQiK4s2fx\njPshTFBAwVtMc+Bc75EKvQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fg6p9@firetestjimis.iam.gserviceaccount.com",
  "client_id": "102422819688924138150",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fg6p9%40firetestjimis.iam.gserviceaccount.com"
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

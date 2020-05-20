import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public transfers: Observable<any[]>;

  transferCollectionRef: AngularFirestoreCollection<any>;

  constructor(public auth: AngularFireAuth, public db: AngularFirestore) {
    this.listenSingleTransferWithToken();
  }

  async listenAllTransfersWithToken() {
    await this.auth.signInWithCustomToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU4ODY4ODk0MSwiZXhwIjoxNTg4NjkyNTQxLCJpc3MiOiJmaXJldGVzdGppbWlzQGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmV0ZXN0amltaXNAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiTlNCRnUyWUpORGdMUUpDWjk5ZFJKbFA0RFJvMiJ9.D3L2AUHGFVAqrcSRMy_3v___iNL4v9TGnvNEksbb16CAZ-35We7bb6seJTKIEm5qgunXpf_u1LdbA4GKyaRksQp9Df8zqZiO_4zK-NJqNo_qFguCAXPcmQwmS07DF1J4CfMDVMGAsnuajSVTTL7PJpQ30F0SpZ0fqcEOix2Y_k1wk5ladhzBsGfUjM2CpdaAFZzoHbQSbTNTCFITs1NTKNt8vOxG6vxG5nSlHSTdDirY3zOx0qDuc_HsrZxt8x-fZiB0Nme8-WQseY87Go6y_5IccxNTc2qcErQ43z4NjkLdbRRKLcT7dQyAKTtBOPAPa0irOELo5usmHw8l-NO-rw");
    this.transfers = this.db.collection('/transfer').valueChanges();
  }

  async listenSingleTransferWithToken() {
    await this.auth.signInWithCustomToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU5MDAwOTE5NywiZXhwIjoxNTkwMDEyNzk3LCJpc3MiOiJmaXJldGVzdGppbWlzQGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmV0ZXN0amltaXNAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiTlNCRnUyWUpORGdMUUpDWjk5ZFJKbFA0RFJvMiJ9.Jsckz_qP29xSi8blTFcqSjdwEtzhwDOPbiTnQVpKT3aTJ5EO3-dZ56ylkdcH-GRErefKqzwmHrmLC0m6tmgufZY8448L9Vp4Lg48T2uHlCHDF3T9u4p0QSemdWxNcfOyITiahJlEGbcRweXj0TCypbgBcl-BfPVLq-OPNxmvyscec_v-ec7E9BnCkRpSez7i6dNeQ18aT9HRWMuVfcOZV00Uvho92tqr1Y-BvZ6Kd0v0-1Yw9cKn2JfCYIvK5lFAothQbhDPpOGSJrraaUlgtdZ-QOiL5mSFcXMi8XS6ltrB2_-WrFfRPKt7wX_J24Kbf6SGE1GLQPAZD9rYbdaG1Q");
    this.transferCollectionRef = this.db.collection<any>('transfer', ref => ref.where("id", "==", "1"));
    this.transfers = this.transferCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });

  }

}
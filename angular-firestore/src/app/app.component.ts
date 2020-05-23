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
    await this.auth.signInWithCustomToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU5MDE3ODgwNSwiZXhwIjoxNTkwMTgyNDA1LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1mZzZwOUBmaXJldGVzdGppbWlzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstZmc2cDlAZmlyZXRlc3RqaW1pcy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6Ik5TQkZ1MllKTkRnTFFKQ1o5OWRSSmxQNERSbzIifQ.FHnVm6tGuftPnu9vrtOnZaJuLctykACHp6ysBj8TO3aDitx3L0xtr2QK28mZiaanEePIzVNteo9LPuWwN82kfRTMtkaE6bLftIRhwkjm2_YFhhQyUHpQnvWxWiaUm2rcOLfSI4jyNE1rYe4zOGuQNfjNk4hfwI29a5b6YQj6kZItxhs7zI1_y5MuUUjw_zzwY8dYvLrcKOqLaab2q-8lvH7Bfncvu6ot8ih9_AHzTIX9XztyNZ5JUKV9UmaDLxNpRTlhMNS7fRlqOVZt1_qEBL9jDYO8aIld7V09HUB6DnXjfiFlVLonFl7gSMVmZ4dYHEGc2lgVwOnsIjZePHMJTw");
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
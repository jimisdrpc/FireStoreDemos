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
    await this.auth.signInWithCustomToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU4ODc5NDE5NiwiZXhwIjoxNTg4Nzk3Nzk2LCJpc3MiOiJmaXJldGVzdGppbWlzQGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmV0ZXN0amltaXNAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiTlNCRnUyWUpORGdMUUpDWjk5ZFJKbFA0RFJvMiJ9.dez3PLV-oV3bx8zykjWZvE4J7gWiLYM2OLia5Wyo04xLyqmyDtdOak4VZZN7R0xaub77pjhwLeX9kf4C0k-7w0WgX53K0LhNRUAlU5z4z8C_M__VNqx_vJ73sR3HpB6UOfdi5bJE2rpgTIDkiWJM5SWAKlg1Wa149xMCSmfbLBCF9NLmUFJFYFUm_wd0xnvFeKFv82oLL7K3wrd7pVaApyN4zdQTIHl2WCrYlwIIRMA_Jv53PDC4qW3hbSo2QBWgJXECCjA4KtltMqANpdyTARGP12DprqygGZ3mS54569K2bsMMM9LJOeTdNb962Dq_eirMKewe6fxbV3mMtZVCVg");
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
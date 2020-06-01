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
    await this.auth.signInWithCustomToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU5MDU4MzE0OCwiZXhwIjoxNTkwNTg2NzQ4LCJpc3MiOiJmaXJldGVzdGppbWlzQGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmV0ZXN0amltaXNAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiTlNCRnUyWUpORGdMUUpDWjk5ZFJKbFA0RFJvMiJ9.FgHlYIQVRXjtb20YYcuGrLNJed5xoRu1t-pSw2XX1YEFkgEiWojdfT55sUgB04WphYG4Hy15nDvyQVEULYor_RH5PpFof347ItQSpK0SUCeUpIEcys6oFVbPh6uX9IUiAPzu1IsrwltG5y8V_p-0h7EeIPMb_fPZF0gDl5mkz6rWx4kYqN5J9Vbm9EurRp9qUWWq796-Na6lD_Ig8nP5egZC2ViRvmVZSRj5jIq4s90IPqU__oWQhyZky_O60SCnWsz1NelmRPBlduI2536tfhRKKFACWiUw4VPgwaIrA4lUJsvBuHVin2vU3RuRlh5hnXhlieafLrIjyO-Ei5jTuA");
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
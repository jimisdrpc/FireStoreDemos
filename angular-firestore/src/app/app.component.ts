import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public transfers: Observable<any[]>;
  uniqueTransfer: any;

  transferCollectionRef: AngularFirestoreCollection<any>;

  constructor(db: AngularFirestore) {

    this.transferCollectionRef = db.collection<any>('transfer', ref => ref.where("id", "==", "1"));
    this.transfers = this.transferCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();// as Todo;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });

    //this.transfers = db.collection('/transfer').valueChanges(); 
    //this.transfers = db.doc<any>(`transfer/sDme6IRIi4ezfeyfrU7y`).valueChanges();

    // this.uniqueTransfer = db.collection('/transfer',
    //   ref => ref.where("id", "==", "1"))
    //   .snapshotChanges().pipe(map(actions => actions.map(a => a.payload.doc.data()))
    //   );;

    // this.uniqueTransfer = db.collection('/transfer', ref => ref.where("id", "==", "1")).snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data();
    //     return { data };
    //   }))


    // db.doc(`transfer/Wsj0dysyHHok3xupwDhD`)
    //   .snapshotChanges()
    //   .pipe()
    //   .subscribe();

  }


  /*
    constructor(private http: HttpClient) {
      this.getTranfers();
    }
    
    public getTranfers() {
  
      const headers = { 'Authorization': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYWJiMjI0NDBkYTAzMmM1ZDAwNDJjZGFhOWQyODVjZjhkMjAyYzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyZXRlc3RqaW1pcyIsImF1ZCI6ImZpcmV0ZXN0amltaXMiLCJhdXRoX3RpbWUiOjE1ODc1MDQ4NTcsInVzZXJfaWQiOiJOU0JGdTJZSk5EZ0xRSkNaOTlkUkpsUDREUm8yIiwic3ViIjoiTlNCRnUyWUpORGdMUUpDWjk5ZFJKbFA0RFJvMiIsImlhdCI6MTU4NzUwNDg1NywiZXhwIjoxNTg3NTA4NDU3LCJlbWFpbCI6ImppbWlzLmRycGNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImppbWlzLmRycGNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.NHIonghH8alr9DUMDD7ddudVfIefxZ9E_m4N49ig-WPmX_qxwJQFlzYp2En3klpCSXJ3uJvS5lkBWBLjdPF3TRc9hkyCTd_Fkpg5syobv14QMYNCZ_d3Abymghe2aiW4jA6koglO93dBJYkk-6RYcRf68dBBkKX9_Qnf5qN9tFQZW_kfBxxokQ6H1s_YZstbaizr8QSrVg10erteD-8MXwYAtDeA29Nipfw8KVuYdJwqeUN9iWuerbpx4-6Uion1qy-bOD5WVgRDkmkeZu01DxebKoUmuzLxYQ1j4Q1ndMH6qoY83ab21FkUifgEtHT4ZXde1ehf_PIwNDx6_ZfJuQ' }
      const body = JSON.stringify({
        "structuredQuery": {
          "where": {
            "fieldFilter": {
              "field": { "fieldPath": "id" },
              "op": "EQUAL",
              "value": { "stringValue": "4" }
            }
          },
          "from": [{ "collectionId": "transfer" }]
        }
      })
  
      this.http.post<any>('https://firestore.googleapis.com/v1/projects/firetestjimis/databases/(default)/documents:runQuery', body, { headers }).subscribe(data => {
        this.transfers = data;
      })
    }
    */
}
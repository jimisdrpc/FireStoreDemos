package com.mycomp.appfirestore

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.EventListener
import com.google.firebase.firestore.FirebaseFirestore
import com.mycomp.appfirestore.data.service.Endpoint
import com.mycomp.appfirestore.data.service.NetworkUtils
import com.mycomp.appfirestore.model.Transfer
import kotlinx.android.synthetic.main.activity_main.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class MainActivity : AppCompatActivity() {

    lateinit var auth: FirebaseAuth

    lateinit var listenerReg : FirebaseFirestore

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnTransfer = findViewById(R.id.btnTransfer) as Button
        val textViewTransfer = findViewById(R.id.textViewTransfer) as TextView
        btnTransfer.setOnClickListener {
            postTransfer()
        }
    }

    fun postTransfer() {
        val retrofitClient = NetworkUtils
            .getRetrofitInstance("http://192.168.15.13:8080/")

        val endpoint = retrofitClient.create(Endpoint::class.java)

        val transfer = Transfer("Demetrio", "Jimis", "100", "", "")
        val callback = endpoint.postTransfer(transfer)

        callback.enqueue(object : Callback<Transfer> {
            override fun onFailure(call: Call<Transfer>, t: Throwable) {
                Toast.makeText(baseContext, t.message, Toast.LENGTH_SHORT).show()
            }

            override fun onResponse(call: Call<Transfer>, response: Response<Transfer>) {
                //textViewTransfer.text = response.body().toString()
                response.body()?.token?.let { listenStatus(it) }
            }
        })

    }

    fun listenStatus(token: String) {
        val TAG = "ListenStatus"
        auth = FirebaseAuth.getInstance()

        auth
            .signInWithCustomToken(token)
            //.signInWithCustomToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU5MTAzNzUzNSwiZXhwIjoxNTkxMDQxMTM1LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1mZzZwOUBmaXJldGVzdGppbWlzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstZmc2cDlAZmlyZXRlc3RqaW1pcy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6Ik5TQkZ1MllKTkRnTFFKQ1o5OWRSSmxQNERSbzIifQ.wfcnWlA5DvFUBRfVWjNizxRWQ3VygPOcD_gl6ijF10c0uw3fLzL08iSo3DAzrazPrE1cqRfmlQvR1duhaNiSOoZvPyvR1rdk4Nsvc5F9r4x7YVpBrusD79wOlPbS7eSTr5rX2n6Wm9jd6kmUr_ThKpoMTUcb4HFul442SlRwKIANDEmeB0JDtpXh4G8cQ5vdIAJ5OWEWKrFmdYakLUSveyifdskN3ozxb6b4E2dVIMn7Fest1XE3HtzbGIrkqScihmYURAS06b2xtyRf-EEwbB8tfsbe-Sj3NiGanzi0ZIz7wyyo0RCBunVbU6zRpDBjEgf5KlEZZZyhD6J39BgXsQ")
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    Log.d(TAG, "*** signInWithCustomToken:success")
                    startSnapshot()
                } else {
                    // If sign in fails, display a message to the user.
                    Log.w(TAG, "signInWithCustomToken:failure", task.exception)
                    Toast.makeText(
                        baseContext, "Authentication failed.",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
    }


    fun startSnapshot() {
        val TAG = "StartSnapshot"

        //Try to pass this(activity context) as first parameter.It will automatically handle acivity life cycle.
        // Example if you are calling this listener in onCreate() and passing this as a first parameter then
        // it will remove this listener in onDestroy() method of activity.
        listenerReg = FirebaseFirestore.getInstance()

        listenerReg.collection("transfer")
            .document("sDme6IRIi4ezfeyfrU7y")
            .addSnapshotListener(
                this,
                EventListener<DocumentSnapshot?> { snapshot, e ->
                    if (e != null) {
                        Log.w(TAG, "Listen failed.", e)
                        return@EventListener
                    }
                    if (snapshot != null && snapshot.exists()) {
                        textViewTransfer.text = snapshot.data!!["status"].toString()
                        //Log.d(TAG, snapshot.data!!["status"].toString())
                    } else {
                        Log.d(TAG, "Current data: null")
                    }
                })


    }

}

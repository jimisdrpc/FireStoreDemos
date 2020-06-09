package com.mycomp.appfirestore

import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.widget.Button
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
    var listenerReg : FirebaseFirestore? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnTransfer = findViewById(R.id.btnTransfer) as Button
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
                response.body()?.token?.let { listenStatus(it) }
            }
        })

    }

    fun listenStatus(token: String) {
        val TAG = "ListenStatus"
        auth = FirebaseAuth.getInstance()

        auth
            .signInWithCustomToken(token)
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

        listenerReg!!.collection("transfer")
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
                    } else {
                        Log.d(TAG, "Current data: null")
                    }
                })


        Handler().postDelayed({
            stopSnapshot()
        }, 1000 * 60 * 2) //stop after 2 minutes
    }

    fun stopSnapshot() {
        if (listenerReg != null) {
            listenerReg!!.terminate()
            listenerReg = null
        }
    }
}

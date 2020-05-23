package com.example.demo
//https://developer.android.com/training/basics/firstapp/starting-activity
//https://firebase.google.com/docs/firestore/quickstart#kotlin+ktx

// Tutorial to CustomToken
//https://firebase.google.com/docs/auth/android/custom-auth#kotlin+ktx

//Tutorial to Snatshot Listeners and its queries
//https://firebase.google.com/docs/firestore/query-data/listen#kotlin+ktx

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class MainActivity : AppCompatActivity() {

    lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        val TAG = "MainActivity"
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        auth = FirebaseAuth.getInstance()

        auth.signInWithCustomToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU5MDIwNTgxMywiZXhwIjoxNTkwMjA5NDEzLCJpc3MiOiJmaXJldGVzdGppbWlzQGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmV0ZXN0amltaXNAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiTlNCRnUyWUpORGdMUUpDWjk5ZFJKbFA0RFJvMiJ9.fLZCruJetBsAAXQSsK1OoAfnEwPxVB0PqxTqBydWufrmrGg6oZr1hMFzwTbMIrtgdb-SVsAZR9XV0FQYBJ1geDL-sl90heDCOUPc0JxU8biVhitPBW6BB4aYQGxyfo2YFBVKc_tna4CtxSI2MjgCuXdhkXA6qMdLzfEefTNX7NwS3ChBcEDelQlc4MjMx8sY9uX5eJxg68Ju2IJvb9-NXRc7gyneMXeP9odVJGE1Cz6yJkSu-DAn2IY3QDJOd7-0qUNc7_XtCMsdfShUWiESnP10dcktckK2iM6Rre3f3xlfxeccDACEnfHpbXMGuZreK6EU3WBfmxGuXa-CSuHUrg")
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    Log.d(TAG, "*** signInWithCustomToken:success")
                } else {
                    // If sign in fails, display a message to the user.
                    Log.w(TAG, "signInWithCustomToken:failure", task.exception)
                    Toast.makeText(
                        baseContext, "Authentication failed.",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }

        //val db = FirebaseFirestore.getInstance()

        FirebaseFirestore.getInstance().collection("transfer")
            .whereEqualTo("id", "1")
            .addSnapshotListener { value, e ->
                if (e != null) {
                    Log.w(TAG, "Listen failed.", e)
                    return@addSnapshotListener
                }

                val transfer = ArrayList<String>()
                for (doc in value!!) {
                    doc.getString("status")?.let {
                        transfer.add(it)
                    }
                }
//                for (document in value) {
//                    Log.d(TAG, "${document.id} => ${document.data}")
//                }
                Log.d(TAG, "*** transfer: $transfer")
            }
    }

}

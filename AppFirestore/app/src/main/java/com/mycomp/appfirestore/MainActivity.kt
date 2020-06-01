package com.mycomp.appfirestore

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import com.mycomp.appfirestore.data.service.Endpoint
import com.mycomp.appfirestore.data.service.NetworkUtils
import com.mycomp.appfirestore.model.Posts
import com.mycomp.appfirestore.model.Transfer
import kotlinx.android.synthetic.main.activity_main.*
import okhttp3.OkHttpClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.net.URL

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnTransfer=findViewById(R.id.btnTransfer) as Button
        val textViewTransfer=findViewById(R.id.textViewTransfer) as TextView
        btnTransfer.setOnClickListener {
            postTransfer()
        }
    }

    fun postTransfer() {
        val retrofitClient = NetworkUtils
            .getRetrofitInstance("http://192.168.15.13:8080/")

        val endpoint = retrofitClient.create(Endpoint::class.java)

        val transfer = Transfer("Demetrio","Jimis","100","","")
        val callback = endpoint.postTransfer(transfer)

        callback.enqueue(object : Callback<Transfer> {
            override fun onFailure(call: Call<Transfer>, t: Throwable) {
                Toast.makeText(baseContext, t.message, Toast.LENGTH_SHORT).show()
            }

            override fun onResponse(call: Call<Transfer>, response: Response<Transfer>) {
                textViewTransfer.text = response.body().toString()
            }
        })

    }


//    fun postTransfer() {
//        val client = OkHttpClient()
//        val url = URL("http://localhost:8080")
//
//        //just a string
//        //var jsonString = "{\"name\": \"Rolando\", \"job\": \"Fakeador\"}"
//
//        //or using jackson
//        val mapperAll = ObjectMapper()
//        val jacksonObj = mapperAll.createObjectNode()
//        jacksonObj.put("name", "Rolando")
//        jacksonObj.put("job", "Fakeador")
//        val jacksonString = jacksonObj.toString()
//
//        val mediaType = "application/json; charset=utf-8".toMediaType()
//        val body = jacksonString.toRequestBody(mediaType)
//
//        val request = Request.Builder()
//            .url(url)
//            .post(body)
//            .build()
//
//        val response = client.newCall(request).execute()
//
//        val responseBody = response.body!!.string()
//
//        //Response
//        println("Response Body: " + responseBody)
//
//        //we could use jackson if we got a JSON
//        val objData = mapperAll.readTree(responseBody)
//
//        println("My name is " + objData.get("name").textValue() + ", and I'm a " + objData.get("job").textValue() + ".")
//    }

//    fun getData() {
//        val retrofitClient = NetworkUtils
//            .getRetrofitInstance("https://jsonplaceholder.typicode.com")
//
//        val endpoint = retrofitClient.create(Endpoint::class.java)
//        val callback = endpoint.getPosts()
//
//        callback.enqueue(object : Callback<List<Posts>> {
//            override fun onFailure(call: Call<List<Posts>>, t: Throwable) {
//                Toast.makeText(baseContext, t.message, Toast.LENGTH_SHORT).show()
//            }
//
//            override fun onResponse(call: Call<List<Posts>>, response: Response<List<Posts>>) {
//                response.body()?.forEach {
//                    textView.text = textView.text.toString().plus(it.body)
//                }
//            }
//        })
//
//    }
}

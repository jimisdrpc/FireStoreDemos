package com.mycomp.appfirestore.data.service

import com.mycomp.appfirestore.model.Posts
import com.mycomp.appfirestore.model.Transfer
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface Endpoint {
    @GET("posts")
    fun getPosts() : Call<List<Posts>>

    @POST("/transfers")
    fun postTransfer(@Body transfer: Transfer): Call<Transfer>

}
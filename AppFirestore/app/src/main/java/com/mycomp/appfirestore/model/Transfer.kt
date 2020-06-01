package com.mycomp.appfirestore.model

data class Transfer(
    val from: String,
    val to: String,
    val value: String,
    val status: String,
    val token: String
) {

}
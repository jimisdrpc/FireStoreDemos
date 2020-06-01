package com.mycomp.transfertoken.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TokenService {


	 @Autowired
	 RestTemplate restTemplate;
	 
	 
//	 @Value("${operations.restURL}")
//	 String serviceURL;

	public String getCustomToken() {
		return restTemplate.getForObject("http://localhost:3000/customtoken", String.class);
	}



}

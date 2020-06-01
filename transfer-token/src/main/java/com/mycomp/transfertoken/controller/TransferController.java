package com.mycomp.transfertoken.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mycomp.transfertoken.model.Transfer;
import com.mycomp.transfertoken.service.TokenService;

@CrossOrigin 
@Controller
@RequestMapping("/transfers")
public class TransferController {
    
	@Autowired
	TokenService tokenservice;
	
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Transfer> transfer(@RequestBody Transfer transfer) {
    	
    	transfer.setToken(tokenservice.getCustomToken());
    	
    	return new ResponseEntity<Transfer>(transfer, HttpStatus.OK);

    }

}

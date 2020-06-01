package com.mycomp.transfertoken.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mycomp.transfertoken.model.Transfer;

@CrossOrigin 
@Controller
@RequestMapping("/transfers")
public class TransferController {
    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Transfer> transfer(@RequestBody Transfer transfer) {
    	
    	transfer.setToken("token");
    	
    	return new ResponseEntity<Transfer>(transfer, HttpStatus.OK);

    }

}

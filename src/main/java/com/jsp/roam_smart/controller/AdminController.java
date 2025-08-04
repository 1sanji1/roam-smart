package com.jsp.roam_smart.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.roam_smart.service.admin.AdminUserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/admin")
@CrossOrigin(origins = "*") 
public class AdminController {

    @Autowired
    private AdminUserService adminUserService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserDetails(@RequestParam(required = false) String email,@RequestParam(required = false) String phone) {
        Map<String, Object> map = new LinkedHashMap<>();

        if(email==null && phone!=null){
            map.put("message", "User details fetched successfully");
            map.put("users", adminUserService.fetchByPhone(phone));

        }else if(email!=null && phone==null){
            map.put("messagwe", "User details fetched successfully");
            map.put("user", adminUserService.fetchByEmail(email));

        }else{
            map.put("messagwe", "User details fetched successfully");
            map.put("users", adminUserService.getUserDetails());
        }
    return ResponseEntity.status(200).body(map);
    }
    //------------------merged with the one above^^^^^^^^^^^^
    // @GetMapping("/fetchbyemail")
    // @PreAuthorize("hasRole('ROLE_ADMIN')")
    // public ResponseEntity<Map<String, Object>> fetchbyemail(@RequestParam String param) {
    //     Map<String, Object> map = new LinkedHashMap<>();
    //     map.put("message", "User details fetched successfully");
    //     map.put("user", adminUserService.fetchByEmail(param));
    //     return ResponseEntity.status(200).body(map);        
    // }
}

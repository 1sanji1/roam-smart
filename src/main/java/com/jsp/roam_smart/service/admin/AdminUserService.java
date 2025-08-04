package com.jsp.roam_smart.service.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.jsp.roam_smart.model.User;
@Service
public interface AdminUserService {

    public List<User> getUserDetails();

    public Optional<User> fetchByEmail(String param);

    public Optional<User> fetchByPhone(String phone);   
}

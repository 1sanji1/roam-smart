package com.jsp.roam_smart.service.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.jsp.roam_smart.model.User;

@Service
public interface AdminUserService {

    public List<User> getUserDetails();

    // Search by email (partial match, case-insensitive)
    public List<User> fetchByEmail(String param);

    // Search by phone (partial match)
    public List<User> fetchByPhone(String phone);

    public void deleteUser(String parm);

    // public Optional<User> fetchByEmail(String param);

    // public Optional<User> fetchByPhone(String phone);
}

package com.jsp.roam_smart.service.admin.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jsp.roam_smart.model.User;
import com.jsp.roam_smart.repository.UserRepository;
import com.jsp.roam_smart.service.admin.AdminUserService;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getUserDetails() {
        return userRepository.findByRole(User.Role.MEMBER);
    }

    // @Override
    // public Optional<User> fetchByEmail(String param) {
    // return userRepository.findByEmail(param);
    // }

    // @Override
    // public Optional<User> fetchByPhone(String phone) {
    // return userRepository.findByPhone(phone);
    // }
    @Override
    public List<User> fetchByEmail(String param) {
        return userRepository.findByEmailContainingIgnoreCase(param);
    }

    @Override
    public List<User> fetchByPhone(String phone) {
        return userRepository.findByPhoneContaining(phone);
    }

    @Override
    public void deleteUser(String parm) {
        
        User user=(User) userRepository.findByEmailIgnoreCase(parm);

        userRepository.deleteById(user.getId());

    }

}

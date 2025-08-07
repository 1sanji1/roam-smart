package com.jsp.roam_smart.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jsp.roam_smart.exception.BadRequestException;
import com.jsp.roam_smart.dto.UserDTO;
import com.jsp.roam_smart.model.User;
import com.jsp.roam_smart.model.User.Role;
import com.jsp.roam_smart.repository.UserRepository;
import com.jsp.roam_smart.service.mail.OtpMailService;
import com.jsp.roam_smart.service.mail.RegestrationEmail;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private Random random;
    @Autowired
    private OtpMailService otpMailService;
    // @Autowired
    // private EmailService emailService;
    @Autowired
    private RegestrationEmail regestrationEmail;

    public void register(UserDTO userDTO, HttpSession session) throws MessagingException {

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
        if (userRepository.existsByPhone(userDTO.getPhone())) {
            throw new BadRequestException("Phone number already exists");
        }
        if (userDTO.getPassword().equals(userDTO.getConfirmPassword()) == false) {
            throw new BadRequestException("password and confirm password do not match");
        }

        // User user=User.builder()
        // .name(userDTO.getName())
        // .email(userDTO.getEmail())
        // .password(passwordEncoder.encode(userDTO.getPassword()))
        // .build();
        // userRepository.save(user);

        // ====sending otp to email======================================
        int otp = otp();
        otpMailService.sendOtpEmail(userDTO.getEmail(), otp, userDTO.getName());

        session.setAttribute("otp", otp);
        session.setAttribute("userDTO", userDTO);
    }

    private int otp() {
        return random.nextInt(100000, 999999);
    }

    public void verifyOtp(int otp, HttpSession session) throws MessagingException {
        int sessionOtp = (int) session.getAttribute("otp");
        UserDTO userDTO = (UserDTO) session.getAttribute("userDTO");
        if (sessionOtp == otp) {
            User user = User.builder()
                    .name(userDTO.getName())
                    .email(userDTO.getEmail())
                    .phone(userDTO.getPhone())
                    .password(passwordEncoder.encode(userDTO.getPassword()))
                    .build();
            userRepository.save(user);
            session.removeAttribute("otp");
            regestrationEmail.sendRegestrationMail(userDTO.getEmail(), userDTO.getName(), userDTO.getPhone());
            // emailService.sendEmail(userDTO.getEmail(), "Registration Successful", "You
            // have successfully registered.");
        } else {
            session.removeAttribute("otp");
            throw new BadRequestException("Invalid OTP");
        }
    }

    // public String login(String email, String rawPassword) {
    // User user = userRepository.findByEmail(email)
    // .orElseThrow(() -> new BadRequestException("Invalid email or password"));

    // if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
    // throw new BadRequestException("Invalid email or password");
    // }

    // // Optional: Generate JWT token here if needed

    // return "Login successful!";
    // }
    public User login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        return user;
    }

    public Role getRoleUser(String email) {
        return userRepository.findByEmail(email)
                .map(User::getRole)
                .orElseThrow(() -> new BadRequestException("User not found"));
    }

}

package com.jsp.roam_smart.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.jsp.roam_smart.model.User;
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);

}

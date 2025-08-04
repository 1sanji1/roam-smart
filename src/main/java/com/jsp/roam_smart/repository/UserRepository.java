package com.jsp.roam_smart.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.jsp.roam_smart.model.User;
import com.jsp.roam_smart.model.User.Role;
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    List<User> findByRole(Role member);
    Optional<User> findByPhone(String phone);

}

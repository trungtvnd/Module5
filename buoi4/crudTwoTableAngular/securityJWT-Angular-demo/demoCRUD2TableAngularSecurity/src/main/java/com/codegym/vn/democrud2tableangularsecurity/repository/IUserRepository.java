package com.codegym.vn.democrud2tableangularsecurity.repository;



import com.codegym.vn.democrud2tableangularsecurity.model.account.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);

    Iterable<User> findUsersByNameContaining(String user_name);

}

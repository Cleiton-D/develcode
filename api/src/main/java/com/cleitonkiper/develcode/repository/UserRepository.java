package com.cleitonkiper.develcode.repository;

import com.cleitonkiper.develcode.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}

package com.cleitonkiper.develcode.controllers;

import com.cleitonkiper.develcode.dto.CreateUserRequestDTO;
import com.cleitonkiper.develcode.entity.User;
import com.cleitonkiper.develcode.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired
  UserRepository repository;

  @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
  public ResponseEntity<User> create(@RequestBody CreateUserRequestDTO data) {
    User newUser = new User();
    newUser.setName(data.getName());
    newUser.setCode(data.getCode());
    newUser.setBirthDate(data.getBirthDate());

    this.repository.save(newUser);

    return ResponseEntity.ok().body(newUser);
  }

}

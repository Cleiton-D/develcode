package com.cleitonkiper.develcode.controllers;

import java.io.IOException;
import java.util.UUID;

import com.cleitonkiper.develcode.dto.UserRequestDTO;
import com.cleitonkiper.develcode.entity.User;
import com.cleitonkiper.develcode.repository.UserRepository;
import com.cleitonkiper.develcode.services.StorageService;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired
  UserRepository repository;

  @Autowired
  StorageService storageService;

  @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
  public ResponseEntity<User> create(@ModelAttribute UserRequestDTO data) throws IOException {
    MultipartFile image = data.getImage();

    String fileExtension = FilenameUtils.getExtension(image.getOriginalFilename());
    String filename = UUID.randomUUID().toString() + "." + fileExtension;
    this.storageService.save(data.getImage(), filename);

    User newUser = new User();
    newUser.setName(data.getName());
    newUser.setCode(data.getCode());
    newUser.setBirthDate(data.getBirthDate());
    newUser.setImage(filename);

    this.repository.save(newUser);

    return ResponseEntity.ok().body(newUser);
  }

  @PutMapping(value = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }, produces = {
      MediaType.APPLICATION_JSON_VALUE })
  public ResponseEntity<User> update(@PathVariable Long id, @ModelAttribute UserRequestDTO data) throws IOException {
    User user = this.repository.findById(id).get();
    User newUser = new User();
    newUser.setName(data.getName());
    newUser.setCode(data.getCode());
    newUser.setBirthDate(data.getBirthDate());

    this.repository.save(user);

    return ResponseEntity.ok().body(user);
  }

  @PatchMapping(value = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE }, produces = {
      MediaType.APPLICATION_JSON_VALUE })
  public ResponseEntity<User> updateImage(@PathVariable Long id, @RequestParam("image") MultipartFile image)
      throws IOException {
    User user = this.repository.findById(id).get();

    String fileExtension = FilenameUtils.getExtension(image.getOriginalFilename());
    String filename = UUID.randomUUID().toString() + "." + fileExtension;

    this.storageService.save(image, filename);
    this.storageService.delete(user.getImage());

    user.setImage(filename);
    this.repository.save(user);

    return ResponseEntity.ok().body(user);
  }

}

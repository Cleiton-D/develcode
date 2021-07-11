package com.cleitonkiper.develcode.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.cleitonkiper.develcode.dto.UserRequestDTO;
import com.cleitonkiper.develcode.entity.User;
import com.cleitonkiper.develcode.repository.UserRepository;
import com.cleitonkiper.develcode.services.StorageService;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

  @GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
  public ResponseEntity<User> show(@PathVariable Long id) throws IOException {
    Optional<User> userOptional = this.repository.findById(id);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      return ResponseEntity.ok().body(user);
    }

    return ResponseEntity.notFound().build();
  }

  @GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
  public ResponseEntity<List<User>> index() throws IOException {
    List<User> users = this.repository.findAll();
    return ResponseEntity.ok().body(users);
  }

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
    Optional<User> userOptional = this.repository.findById(id);
    if (userOptional.isPresent() == false) {
      return ResponseEntity.notFound().build();
    }

    User user = userOptional.get();
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
    Optional<User> userOptional = this.repository.findById(id);
    if (userOptional.isPresent() == false) {
      return ResponseEntity.notFound().build();
    }

    User user = userOptional.get();

    String fileExtension = FilenameUtils.getExtension(image.getOriginalFilename());
    String filename = UUID.randomUUID().toString() + "." + fileExtension;

    this.storageService.save(image, filename);
    this.storageService.delete(user.getImage());

    user.setImage(filename);
    this.repository.save(user);

    return ResponseEntity.ok().body(user);
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) throws IOException {
    Optional<User> userOptional = this.repository.findById(id);
    if (userOptional.isPresent() == false) {
      return ResponseEntity.notFound().build();
    }

    User user = userOptional.get();

    this.storageService.delete(user.getImage());
    this.repository.delete(user);

    return ResponseEntity.status(204).build();
  }

}

package com.cleitonkiper.develcode.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StorageServiceImpl implements StorageService {
  private final Path root = Paths.get("uploads");

  @Override
  public void init() {
    try {
      if (Files.exists(this.root) == false) {
        Files.createDirectory(this.root);
      }
    } catch (IOException e) {
      throw new RuntimeException("Could not initialize folder for upload!");
    }
  }

  @Override
  public void save(MultipartFile file, String filename) throws IOException {
    try {
      Files.copy(file.getInputStream(), this.root.resolve(filename));
    } catch (Exception e) {
      throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
    }
  }

  @Override
  public String getFilePath(String filename) {
    return this.root.resolve(filename).toAbsolutePath().toString();
  }

}

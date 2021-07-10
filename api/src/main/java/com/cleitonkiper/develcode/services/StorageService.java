package com.cleitonkiper.develcode.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
  public void init();

  public void save(MultipartFile file, String filename) throws IOException;

  public void delete(String filename) throws IOException;

  public String getFilePath(String filename);
}

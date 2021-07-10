package com.cleitonkiper.develcode.controllers;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import com.cleitonkiper.develcode.services.StorageService;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/static")
public class StaticController {

  @Autowired
  private StorageService storageService;

  @GetMapping(value = "/{filename}", produces = MediaType.IMAGE_JPEG_VALUE)
  public ResponseEntity<byte[]> getFile(@PathVariable String filename) throws IOException {
    String filepath = this.storageService.getFilePath(filename);
    InputStream in = new FileInputStream(filepath);

    return ResponseEntity.ok(IOUtils.toByteArray(in));
  }
}

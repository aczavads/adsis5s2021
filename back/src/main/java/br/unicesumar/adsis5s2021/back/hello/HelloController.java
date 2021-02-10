package br.unicesumar.adsis5s2021.back.hello;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hello")
public class HelloController {

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public String get() {
        return "Hello, how are you?";
    }
    
}

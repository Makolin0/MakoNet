package com.makonet;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
		info =
		@Info(
				title = "Makonet",
				description = "Adam jest piękny :3",
				version = "1.0.0"))
public class MakonetApplication {

	public static void main(String[] args) {
		SpringApplication.run(MakonetApplication.class, args);
	}

}

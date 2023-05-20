package ma.enset.inventoryservice;

import ma.enset.inventoryservice.entities.Product;
import ma.enset.inventoryservice.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(ProductRepository productRepository, RepositoryRestConfiguration configuration){
        configuration.exposeIdsFor(Product.class);
        return args -> {
            productRepository.save(new Product(null, "Laptop", 12000.0, 5));
            productRepository.save(new Product(null, "Phone", 1000.0, 15));
            productRepository.save(new Product(null, "Printer", 200.0, 25));
        };
    }
}

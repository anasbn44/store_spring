package ma.enset.customerservice;

import ma.enset.customerservice.entities.Customer;
import ma.enset.customerservice.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(CustomerRepository customerRepository, RepositoryRestConfiguration configuration) {
        configuration.exposeIdsFor(Customer.class);
        return args -> {
            customerRepository.save(new Customer(null, "nom1", "nom1@gmail.com"));
            customerRepository.save(new Customer(null, "nom2", "nom2@gmail.com"));
            customerRepository.save(new Customer(null, "nom3", "nom3@gmail.com"));

        };
    }

}

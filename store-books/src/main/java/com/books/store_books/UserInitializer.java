package com.books.store_books;

import com.books.store_books.user.AppUser;
import com.books.store_books.user.AppUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UserInitializer {

    @Bean
    CommandLineRunner initUsers(AppUserRepository repo, PasswordEncoder encoder) {
        return args -> {
            if (repo.count() == 0) {
                AppUser admin = new AppUser();
                admin.setUsername("admin");
                admin.setPassword(encoder.encode("password123"));
                admin.setRole("ADMIN");
                repo.save(admin);

                AppUser user = new AppUser();
                user.setUsername("user1");
                user.setPassword(encoder.encode("userpass"));
                user.setRole("USER");
                repo.save(user);
            }
        };
    }
}

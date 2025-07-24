package com.books.store_books;

import com.books.store_books.bookcatalog.Book;
import com.books.store_books.bookcatalog.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(BookRepository bookRepository) {
        return args -> {
            if (bookRepository.count() == 0) {
                bookRepository.save(new Book(null, "1000000001", "Java Programming", "Learn Java from scratch", "assets/images/1.jpg", "Ali Hassan", 49.99, 4.3, "Programming"));
                bookRepository.save(new Book(null, "1000000002", "Mastering Angular", "Comprehensive guide to Angular", "assets/images/2.jpg", "Sara Ahmed", 59.99, 4.7, "Web"));
                bookRepository.save(new Book(null, "1000000003", "UI/UX Design", "Design better user experiences", "assets/images/3.jpg", "Mona Adel", 39.50, 4.2, "Design"));
                bookRepository.save(new Book(null, "1000000004", "Python for Data Science", "Practical Python applications", "assets/images/4.jpg", "Hassan Mostafa", 55.00, 4.6, "Data Science"));
                bookRepository.save(new Book(null, "1000000005", "Intro to Machine Learning", "Basics of ML", "assets/images/5.jpg", "Omar Said", 64.00, 4.8, "AI"));
                bookRepository.save(new Book(null, "1000000006", "Spring Boot Essentials", "Build backend with Spring", "assets/images/6.jpg", "Yasmine Salah", 47.25, 4.4, "Programming"));
                bookRepository.save(new Book(null, "1000000007", "HTML & CSS", "Build beautiful websites", "assets/images/7.jpg", "Tariq Zain", 29.99, 4.1, "Web"));
                bookRepository.save(new Book(null, "1000000008", "Photoshop Basics", "Getting started with Photoshop", "assets/images/8.jpg", "Nada Ali", 33.50, 3.9, "Design"));
                bookRepository.save(new Book(null, "1000000009", "Deep Learning", "Intro to Neural Networks", "assets/images/9.jpg", "Fares Kamel", 79.00, 4.9, "AI"));
                bookRepository.save(new Book(null, "1000000010", "Mobile App Dev", "Build Android apps", "assets/images/10.jpg", "Salma Fathy", 51.75, 4.5, "Mobile"));
                bookRepository.save(new Book(null, "1000000011", "Kotlin for Beginners", "Start Kotlin programming", "assets/images/11.jpg", "Mohamed Nour", 43.00, 4.0, "Mobile"));
                bookRepository.save(new Book(null, "1000000012", "C++ Fundamentals", "Understand C++ deeply", "assets/images/12.jpg", "Yara Essam", 48.50, 4.3, "Programming"));
                bookRepository.save(new Book(null, "1000000013", "React.js Guide", "Frontend development with React", "assets/images/13.jpg", "Ahmed Galal", 56.00, 4.6, "Web"));
                bookRepository.save(new Book(null, "1000000014", "UI Animation", "Create dynamic interfaces", "assets/images/14.jpg", "Lina Maher", 36.25, 4.2, "Design"));
                bookRepository.save(new Book(null, "1000000015", "Data Structures", "Learn core structures", "assets/images/15.jpg", "Omar Badr", 42.75, 4.1, "Programming"));
                bookRepository.save(new Book(null, "1000000016", "Cybersecurity Basics", "Protect digital assets", "assets/images/16.jpg", "Rania Nabil", 59.90, 4.7, "Security"));
                bookRepository.save(new Book(null, "1000000017", "Cloud Computing", "Intro to cloud services", "assets/images/17.jpg", "Sami Younis", 66.00, 4.6, "Cloud"));
                bookRepository.save(new Book(null, "1000000018", "Agile Development", "Efficient team workflows", "assets/images/18.jpg", "Khaled Sami", 39.99, 4.0, "Management"));
                bookRepository.save(new Book(null, "1000000019", "SQL & Databases", "Query and manage data", "assets/images/19.jpg", "Amal Hussein", 44.25, 4.3, "Database"));
                bookRepository.save(new Book(null, "1000000020", "DevOps Practices", "CI/CD fundamentals", "assets/images/20.jpg", "Yousef Abbas", 61.50, 4.5, "DevOps"));
            }
        };
    }
}

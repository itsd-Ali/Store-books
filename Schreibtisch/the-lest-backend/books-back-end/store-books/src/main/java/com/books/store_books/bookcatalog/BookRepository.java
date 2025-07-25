package com.books.store_books.bookcatalog;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase
            (
                    String title,
                    String author
//                    String isbn,
//                    String summary,
//                    String imageUr,
//                    double price,
//                    double rating,
//                    String category



            );
}

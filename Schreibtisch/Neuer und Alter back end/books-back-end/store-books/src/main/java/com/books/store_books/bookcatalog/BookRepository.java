package com.books.store_books.bookcatalog;

import com.books.store_books.bookcatalog.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase
            (
                    String title,
                    String author
            );
}

package com.books.store_books.controller;

import com.books.store_books.bookcatalog.Book;
import com.books.store_books.bookcatalog.BookRepository;

import com.books.store_books.login.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/books")
//  @CrossOrigin(origins = "*") // للسماح للفرونت اند بالوصول
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Autowired
    private BookRepository repository;

    // الحصول على جميع الكتب
    @GetMapping
    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    // البحث بالعنوان
    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam("query") String query) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }


    // إضافة كتاب
    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        return ResponseEntity.ok(bookRepository.save(book));
    }

    // حذف كتاب
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return ResponseEntity.ok("Book deleted");
        } else {
            return ResponseEntity.status(404).body("Book not found");
        }
    }


}

package com.books.store_books.bookcatalog;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Entity
public class Book {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String isbn;
        private String title;
        private String summary;
        private String imageUrl;

        private String author;
        private double price;
        private double rating;
        private String category;

    public Book(String category) {
        this.category = category;
    }

    public Book(Long id, String isbn, String title, String summary, String imageUrl,
                String author, double price, double rating, String category) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.summary = summary;
        this.imageUrl = imageUrl;
        this.author = author;
        this.price = price;
        this.rating = rating;
        this.category = category;
    }

    public Book() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    // Getters and Setters
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public double getprice() { return price; }
    public void setprice(double price) { this.price = price; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
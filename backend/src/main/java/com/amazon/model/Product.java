package com.amazon.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "original_price")
    private BigDecimal originalPrice;

    private String category;
    private String brand;

    @Column(name = "image_url")
    private String imageUrl;

    private Integer stock = 0;
    private Double rating = 4.0;

    @Column(name = "is_prime")
    private Boolean isPrime = false;

    @Column(name = "review_count")
    private Integer reviewCount = 0;
}

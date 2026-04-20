package com.amazon.service;

import com.amazon.model.Product;
import com.amazon.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> searchProducts(String query) {
        if (query == null || query.isBlank()) return productRepository.findAll();
        return productRepository.searchProducts(query.trim());
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    public List<Product> getPrimeProducts() {
        return productRepository.findByIsPrimeTrue();
    }

    public List<Product> getProductsByMaxPrice(BigDecimal maxPrice) {
        return productRepository.findByMaxPrice(maxPrice);
    }

    public List<String> getAllCategories() {
        return productRepository.findAllCategories();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(updatedProduct.getName());
            existing.setDescription(updatedProduct.getDescription());
            existing.setPrice(updatedProduct.getPrice());
            existing.setOriginalPrice(updatedProduct.getOriginalPrice());
            existing.setCategory(updatedProduct.getCategory());
            existing.setBrand(updatedProduct.getBrand());
            existing.setImageUrl(updatedProduct.getImageUrl());
            existing.setStock(updatedProduct.getStock());
            existing.setRating(updatedProduct.getRating());
            existing.setIsPrime(updatedProduct.getIsPrime());
            return productRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Product not found: " + id));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product reduceStock(Long productId, int quantity) {
        return productRepository.findById(productId).map(p -> {
            if (p.getStock() < quantity) throw new RuntimeException("Insufficient stock for: " + p.getName());
            p.setStock(p.getStock() - quantity);
            return productRepository.save(p);
        }).orElseThrow(() -> new RuntimeException("Product not found: " + productId));
    }
}

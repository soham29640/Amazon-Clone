package com.amazon.config;

import com.amazon.model.Product;
import com.amazon.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        // Only seed if table is empty
        if (productRepository.count() > 0) {
            System.out.println("✅ Products already exist in database. Skipping seed.");
            return;
        }

        System.out.println("🌱 Seeding products into MySQL...");

        List<Product> products = List.of(
            Product.builder()
                .name("Apple iPhone 15 Pro (256GB) - Natural Titanium")
                .description("A17 Pro chip, 48MP camera, USB 3, titanium design")
                .price(new BigDecimal("129900.00"))
                .originalPrice(new BigDecimal("149900.00"))
                .category("Electronics").brand("Apple")
                .imageUrl("https://picsum.photos/seed/phone/500/500")
                .stock(50).rating(5.0).isPrime(true).reviewCount(0)
                .build(),
            Product.builder()
                .name("Samsung 65 inch 4K QLED Smart TV")
                .description("4K QLED display, built-in Alexa, Wi-Fi, Bluetooth")
                .price(new BigDecimal("89999.00"))
                .originalPrice(new BigDecimal("120000.00"))
                .category("Electronics").brand("Samsung")
                .imageUrl("https://picsum.photos/seed/tv/500/500")
                .stock(20).rating(4.0).isPrime(true).reviewCount(0)
                .build(),
            Product.builder()
                .name("Sony WH-1000XM5 Wireless Headphones")
                .description("Industry-leading noise cancellation, 30hr battery")
                .price(new BigDecimal("24990.00"))
                .originalPrice(new BigDecimal("34990.00"))
                .category("Electronics").brand("Sony")
                .imageUrl("https://picsum.photos/seed/headphone/500/500")
                .stock(100).rating(5.0).isPrime(true).reviewCount(0)
                .build(),
            Product.builder()
                .name("The Alchemist by Paulo Coelho")
                .description("A global bestseller about following your dreams")
                .price(new BigDecimal("199.00"))
                .originalPrice(new BigDecimal("350.00"))
                .category("Books").brand("HarperCollins")
                .imageUrl("https://picsum.photos/seed/book1/500/500")
                .stock(500).rating(4.0).isPrime(false).reviewCount(0)
                .build(),
            Product.builder()
                .name("Atomic Habits by James Clear")
                .description("Build good habits and break bad ones")
                .price(new BigDecimal("399.00"))
                .originalPrice(new BigDecimal("599.00"))
                .category("Books").brand("Penguin")
                .imageUrl("https://picsum.photos/seed/book2/500/500")
                .stock(300).rating(5.0).isPrime(true).reviewCount(0)
                .build(),
            Product.builder()
                .name("Nike Air Max 270 Running Shoes")
                .description("Lightweight, cushioned running shoes")
                .price(new BigDecimal("7995.00"))
                .originalPrice(new BigDecimal("11995.00"))
                .category("Clothing").brand("Nike")
                .imageUrl("https://picsum.photos/seed/shoe/500/500")
                .stock(80).rating(4.0).isPrime(true).reviewCount(0)
                .build(),
            Product.builder()
                .name("Instant Pot Duo 7-in-1 Pressure Cooker")
                .description("Multi-use programmable pressure cooker")
                .price(new BigDecimal("8499.00"))
                .originalPrice(new BigDecimal("12999.00"))
                .category("Home").brand("Instant Pot")
                .imageUrl("https://picsum.photos/seed/pot/500/500")
                .stock(60).rating(4.0).isPrime(false).reviewCount(0)
                .build(),
            Product.builder()
                .name("LEGO Technic Bugatti Chiron Set")
                .description("3599 pieces, 1:8 scale model")
                .price(new BigDecimal("15999.00"))
                .originalPrice(new BigDecimal("19999.00"))
                .category("Toys").brand("LEGO")
                .imageUrl("https://picsum.photos/seed/lego/500/500")
                .stock(30).rating(5.0).isPrime(true).reviewCount(0)
                .build(),
            Product.builder()
                .name("Kindle Paperwhite 16GB Ad-Free")
                .description("Glare-free display, waterproof, 10 weeks battery")
                .price(new BigDecimal("13999.00"))
                .originalPrice(new BigDecimal("16999.00"))
                .category("Electronics").brand("Amazon")
                .imageUrl("https://picsum.photos/seed/kindle/500/500")
                .stock(120).rating(5.0).isPrime(true).reviewCount(0)
                .build(),
            Product.builder()
                .name("boAt Airdopes 141 TWS Earbuds")
                .description("42H total playback, IPX4 water resistant")
                .price(new BigDecimal("999.00"))
                .originalPrice(new BigDecimal("2990.00"))
                .category("Electronics").brand("boAt")
                .imageUrl("https://picsum.photos/seed/earbuds/500/500")
                .stock(200).rating(4.0).isPrime(false).reviewCount(0)
                .build(),
            Product.builder()
                .name("Prestige Electric Kettle 1.8L")
                .description("Stainless steel, auto shut-off, 1500W")
                .price(new BigDecimal("799.00"))
                .originalPrice(new BigDecimal("1299.00"))
                .category("Home").brand("Prestige")
                .imageUrl("https://picsum.photos/seed/kettle/500/500")
                .stock(150).rating(4.0).isPrime(false).reviewCount(0)
                .build(),
            Product.builder()
                .name("Fastrack Analog Mens Watch")
                .description("Quartz movement, stainless steel case")
                .price(new BigDecimal("1295.00"))
                .originalPrice(new BigDecimal("2295.00"))
                .category("Clothing").brand("Fastrack")
                .imageUrl("https://picsum.photos/seed/watch/500/500")
                .stock(90).rating(4.0).isPrime(false).reviewCount(0)
                .build()
        );

        productRepository.saveAll(products);
        System.out.println("✅ " + products.size() + " products seeded into MySQL successfully!");
    }
}
package com.amazon.controller;

import com.amazon.model.CartItem;
import com.amazon.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;

    // GET /api/cart
    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(cartService.getCartItems(userDetails.getUsername()));
    }

    // POST /api/cart/add
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, Object> body) {
        try {
            Long productId = Long.valueOf(body.get("productId").toString());
            int quantity = body.containsKey("quantity")
                    ? Integer.parseInt(body.get("quantity").toString()) : 1;

            CartItem item = cartService.addToCart(userDetails.getUsername(), productId, quantity);
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // PUT /api/cart/{id}
    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuantity(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body) {
        try {
            int quantity = body.get("quantity");
            CartItem updated = cartService.updateQuantity(userDetails.getUsername(), id, quantity);
            if (updated == null) {
                return ResponseEntity.ok(Map.of("message", "Item removed (quantity was 0)"));
            }
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // DELETE /api/cart/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> removeFromCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        cartService.removeFromCart(userDetails.getUsername(), id);
        return ResponseEntity.ok(Map.of("message", "Item removed from cart"));
    }

    // DELETE /api/cart/clear
    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, String>> clearCart(
            @AuthenticationPrincipal UserDetails userDetails) {
        cartService.clearCart(userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Cart cleared"));
    }
}

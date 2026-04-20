package com.amazon.controller;

import com.amazon.model.Order;
import com.amazon.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    // GET /api/orders
    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userDetails.getUsername()));
    }

    // GET /api/orders/{id}
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        try {
            Order order = orderService.getOrderById(id, userDetails.getUsername());
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        }
    }

    // POST /api/orders  — place a new order
    @PostMapping
    public ResponseEntity<?> placeOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, Object> orderData) {
        try {
            Order order = orderService.placeOrder(userDetails.getUsername(), orderData);
            return ResponseEntity.ok(Map.of(
                    "id", order.getId(),
                    "status", order.getStatus(),
                    "total", order.getTotal(),
                    "message", "Order placed successfully!"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // POST /api/orders/{id}/cancel
    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancelOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        try {
            Order cancelled = orderService.cancelOrder(id, userDetails.getUsername());
            return ResponseEntity.ok(Map.of(
                    "id", cancelled.getId(),
                    "status", cancelled.getStatus(),
                    "message", "Order cancelled successfully"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // PUT /api/orders/{id}/status  (Admin only)
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        try {
            Order.OrderStatus status = Order.OrderStatus.valueOf(body.get("status").toUpperCase());
            Order updated = orderService.updateStatus(id, status);
            return ResponseEntity.ok(Map.of(
                    "id", updated.getId(),
                    "status", updated.getStatus()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}

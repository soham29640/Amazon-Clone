package com.amazon.service;

import com.amazon.model.*;
import com.amazon.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    public List<Order> getOrdersByUser(String email) {
        User user = getUserByEmail(email);
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public Order getOrderById(Long id, String email) {
        User user = getUserByEmail(email);
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return order;
    }

    @Transactional
    public Order placeOrder(String email, Map<String, Object> orderData) {
        User user = getUserByEmail(email);

        // Parse address
        @SuppressWarnings("unchecked")
        Map<String, String> address = (Map<String, String>) orderData.get("address");

        @SuppressWarnings("unchecked")
        Map<String, String> payment = (Map<String, String>) orderData.get("payment");

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> itemsData = (List<Map<String, Object>>) orderData.get("items");

        // Calculate total and build items
        BigDecimal total = BigDecimal.ZERO;

        Order order = Order.builder()
                .user(user)
                .status(Order.OrderStatus.PROCESSING)
                .shippingName(address != null ? address.get("name") : "")
                .shippingPhone(address != null ? address.get("phone") : "")
                .shippingLine1(address != null ? address.get("line1") : "")
                .shippingLine2(address != null ? address.get("line2") : "")
                .shippingCity(address != null ? address.get("city") : "")
                .shippingState(address != null ? address.get("state") : "")
                .shippingPincode(address != null ? address.get("pincode") : "")
                .paymentMethod(payment != null ? payment.get("method") : "cod")
                .total(BigDecimal.ZERO)
                .build();

        Order savedOrder = orderRepository.save(order);

        // Create order items
        List<OrderItem> orderItems = itemsData.stream().map(itemData -> {
            Long productId = Long.valueOf(itemData.get("id").toString());
            int qty = Integer.parseInt(itemData.get("quantity").toString());
            BigDecimal price = new BigDecimal(itemData.get("price").toString());

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

            // Reduce stock
            if (product.getStock() >= qty) {
                product.setStock(product.getStock() - qty);
                productRepository.save(product);
            }

            return OrderItem.builder()
                    .order(savedOrder)
                    .product(product)
                    .quantity(qty)
                    .price(price)
                    .build();
        }).collect(Collectors.toList());

        orderItemRepository.saveAll(orderItems);

        // Calculate and update total
        BigDecimal orderTotal = orderItems.stream()
                .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        savedOrder.setTotal(orderTotal);
        savedOrder.setItems(orderItems);
        orderRepository.save(savedOrder);

        // Clear the cart
        cartItemRepository.deleteByUserId(user.getId());

        return savedOrder;
    }

    @Transactional
    public Order updateStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        order.setStatus(status);
        order.setUpdatedAt(java.time.LocalDateTime.now());
        return orderRepository.save(order);
    }

    @Transactional
    public Order cancelOrder(Long orderId, String email) {
        User user = getUserByEmail(email);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        if (order.getStatus() == Order.OrderStatus.DELIVERED) {
            throw new RuntimeException("Cannot cancel a delivered order");
        }

        // Restore stock
        order.getItems().forEach(item -> {
            Product p = item.getProduct();
            p.setStock(p.getStock() + item.getQuantity());
            productRepository.save(p);
        });

        order.setStatus(Order.OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
    }
}

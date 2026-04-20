-- Only insert if table is empty (MySQL safe seed)
INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'Apple iPhone 15 Pro (256GB) - Natural Titanium' as name,
  'A17 Pro chip, 48MP camera, USB 3, titanium design' as description,
  129900.00 as price, 149900.00 as original_price,
  'Electronics' as category, 'Apple' as brand,
  'https://picsum.photos/seed/phone/500/500' as image_url,
  50 as stock, 5.0 as rating, true as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products LIMIT 1);

INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'Samsung 65 inch 4K QLED Smart TV' as name,
  '4K QLED display, built-in Alexa, Wi-Fi, Bluetooth' as description,
  89999.00 as price, 120000.00 as original_price,
  'Electronics' as category, 'Samsung' as brand,
  'https://picsum.photos/seed/tv/500/500' as image_url,
  20 as stock, 4.0 as rating, true as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products WHERE name='Samsung 65 inch 4K QLED Smart TV');

INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'Sony WH-1000XM5 Wireless Headphones' as name,
  'Industry-leading noise cancellation, 30hr battery' as description,
  24990.00 as price, 34990.00 as original_price,
  'Electronics' as category, 'Sony' as brand,
  'https://picsum.photos/seed/headphone/500/500' as image_url,
  100 as stock, 5.0 as rating, true as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products WHERE name='Sony WH-1000XM5 Wireless Headphones');

INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'The Alchemist by Paulo Coelho' as name,
  'A global bestseller about following your dreams' as description,
  199.00 as price, 350.00 as original_price,
  'Books' as category, 'HarperCollins' as brand,
  'https://picsum.photos/seed/book1/500/500' as image_url,
  500 as stock, 4.0 as rating, false as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products WHERE name='The Alchemist by Paulo Coelho');

INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'Atomic Habits by James Clear' as name,
  'Build good habits and break bad ones' as description,
  399.00 as price, 599.00 as original_price,
  'Books' as category, 'Penguin' as brand,
  'https://picsum.photos/seed/book2/500/500' as image_url,
  300 as stock, 5.0 as rating, true as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products WHERE name='Atomic Habits by James Clear');

INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'Nike Air Max 270 Running Shoes' as name,
  'Lightweight, cushioned running shoes' as description,
  7995.00 as price, 11995.00 as original_price,
  'Clothing' as category, 'Nike' as brand,
  'https://picsum.photos/seed/shoe/500/500' as image_url,
  80 as stock, 4.0 as rating, true as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products WHERE name='Nike Air Max 270 Running Shoes');

INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'Instant Pot Duo 7-in-1 Pressure Cooker' as name,
  'Multi-use programmable pressure cooker' as description,
  8499.00 as price, 12999.00 as original_price,
  'Home' as category, 'Instant Pot' as brand,
  'https://picsum.photos/seed/pot/500/500' as image_url,
  60 as stock, 4.0 as rating, false as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products WHERE name='Instant Pot Duo 7-in-1 Pressure Cooker');

INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'LEGO Technic Bugatti Chiron Set' as name,
  '3599 pieces, 1:8 scale model' as description,
  15999.00 as price, 19999.00 as original_price,
  'Toys' as category, 'LEGO' as brand,
  'https://picsum.photos/seed/lego/500/500' as image_url,
  30 as stock, 5.0 as rating, true as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products WHERE name='LEGO Technic Bugatti Chiron Set');

INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'Kindle Paperwhite 16GB Ad-Free' as name,
  'Glare-free display, waterproof, 10 weeks battery' as description,
  13999.00 as price, 16999.00 as original_price,
  'Electronics' as category, 'Amazon' as brand,
  'https://picsum.photos/seed/kindle/500/500' as image_url,
  120 as stock, 5.0 as rating, true as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products WHERE name='Kindle Paperwhite 16GB Ad-Free');

INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'boAt Airdopes 141 TWS Earbuds' as name,
  '42H total playback, IPX4 water resistant' as description,
  999.00 as price, 2990.00 as original_price,
  'Electronics' as category, 'boAt' as brand,
  'https://picsum.photos/seed/earbuds/500/500' as image_url,
  200 as stock, 4.0 as rating, false as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products WHERE name='boAt Airdopes 141 TWS Earbuds');

INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'Prestige Electric Kettle 1.8L' as name,
  'Stainless steel, auto shut-off, 1500W' as description,
  799.00 as price, 1299.00 as original_price,
  'Home' as category, 'Prestige' as brand,
  'https://picsum.photos/seed/kettle/500/500' as image_url,
  150 as stock, 4.0 as rating, false as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products WHERE name='Prestige Electric Kettle 1.8L');

INSERT INTO products (name, description, price, original_price, category, brand, image_url, stock, rating, is_prime, review_count)
SELECT * FROM (SELECT
  'Fastrack Analog Mens Watch' as name,
  'Quartz movement, stainless steel case' as description,
  1295.00 as price, 2295.00 as original_price,
  'Clothing' as category, 'Fastrack' as brand,
  'https://picsum.photos/seed/watch/500/500' as image_url,
  90 as stock, 4.0 as rating, false as is_prime, 0 as review_count) AS tmp
WHERE NOT EXISTS (SELECT id FROM products WHERE name='Fastrack Analog Mens Watch');
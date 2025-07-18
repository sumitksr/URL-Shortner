# URL Shortener
# first next js project
This is a C++ implementation of a simple URL shortener. The program converts long URLs into shorter versions and retrieves the original URL when given a short one. It uses Base62 encoding and a hashmap for efficient mapping.

## Features

- **Efficient URL Shortening:** Generates unique short URLs using Base62 encoding.
- **URL Retrieval:** Retrieves the original URL from a given short URL.
- **In-Memory Storage:** Uses `unordered_map` for fast lookups.
- **User-Friendly Interface:** Command-line based input for shortening and retrieving URLs.

## Prerequisites

- A C++ compiler (e.g., `g++`) that supports C++11 or later.

## How to Run

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/sumitksr/URL-Shortner.git
   cd URL-Shortner
   ```

2. **Compile the Code:**

   ```bash
   g++ main.cpp -o url_shortener
   ```

3. **Run the Executable:**

   ```bash
   ./url_shortener
   ```

4. **Usage:**
   - Enter `1` to shorten a URL.
   - Enter `2` to retrieve the original URL.
   - Enter `3` to exit the program.

## Example Run

```
1. Shorten URL
2. Retrieve URL
3. Exit
Enter your choice: 1
Enter the long URL: https://www.example.com/very/long/url
Shortened URL: short.url/abc12

1. Shorten URL
2. Retrieve URL
3. Exit
Enter your choice: 2
Enter the short URL: short.url/abc12
Original URL: https://www.example.com/very/long/url
```
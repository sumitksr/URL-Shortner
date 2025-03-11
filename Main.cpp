#include <iostream>
#include <unordered_map>
#include <string>
#include <algorithm>
using namespace std;

class URLShortener {
private:
    unordered_map<string, string> shortToLong; // Maps short URLs to long URLs
    unordered_map<string, string> longToShort; // Maps long URLs to short URLs
    const string characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    int counter = 100; // Start counter at 100 for short keys

    // Function to convert an integer to a fixed 5-character Base62 string
    string encodeBase62(int num) {
        string shortURL;
        while (num) {
            shortURL += characters[num % 62];
            num /= 62;
        }
        reverse(shortURL.begin(), shortURL.end());
        while (shortURL.length() < 5) {
            shortURL = "a" + shortURL; // Pad with 'a' to ensure length 5
        }
        return shortURL;
    }

public:
    // Function to shorten a given URL
    string shortenURL(const string& longURL) {
        if (longToShort.find(longURL) != longToShort.end()) {
            return "short.url/" + longToShort[longURL]; // Return existing short URL
        }

        string shortKey = encodeBase62(++counter);
        shortToLong[shortKey] = longURL;
        longToShort[longURL] = shortKey;

        return "short.url/" + shortKey;
    }

    // Function to retrieve the original URL
    string retrieveURL(const string& shortURL) {
        string key = shortURL.substr(11); // Extract short key after "short.url/"
        return shortToLong.count(key) ? shortToLong[key] : "URL not found!";
    }
};

int main() {
    URLShortener urlShortener;
    int choice;

    while (true) {
        cout << "\n1. Shorten URL\n2. Retrieve URL\n3. Exit\nEnter your choice: ";
        cin >> choice;
        cin.ignore(); // Clear the input buffer

        if (choice == 1) {
            string longURL;
            cout << "Enter the long URL: ";
            getline(cin, longURL);
            string shortURL = urlShortener.shortenURL(longURL);
            cout << "Shortened URL: " << shortURL << endl;
        } 
        else if (choice == 2) {
            string shortURL;
            cout << "Enter the short URL: ";
            getline(cin, shortURL);
            cout << "Original URL: " << urlShortener.retrieveURL(shortURL) << endl;
        } 
        else if (choice == 3) {
            break;
        } 
        else {
            cout << "Invalid choice. Try again." << endl;
        }
    }

    return 0;
}

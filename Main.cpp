#include <iostream>
#include <unordered_map>
#include <string>
#include <random>

using namespace std;

class URLShortener {
private:
    unordered_map<string, string> shortToLong;
    unordered_map<string, string> longToShort;
    const string characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const int keyLength = 6;

    string generateRandomKey() {
        string key;
        random_device rd;
        mt19937 generator(rd());
        uniform_int_distribution<> dist(0, characters.size() - 1);

        for (int i = 0; i < keyLength; ++i) {
            key += characters[dist(generator)];
        }
        return key;
    }

public:
    string shortenURL(const string& longURL) {
        if (longToShort.find(longURL) != longToShort.end()) {
            return longToShort[longURL];
        }

        string key;
        do {
            key = generateRandomKey();
        } while (shortToLong.find(key) != shortToLong.end());

        string shortURL = "http://short.url/" + key;
        shortToLong[key] = longURL;
        longToShort[longURL] = shortURL;

        return shortURL;
    }

    string getOriginalURL(const string& shortURL) {
        string key = shortURL.substr(shortURL.find_last_of('/') + 1);
        if (shortToLong.find(key) != shortToLong.end()) {
            return shortToLong[key];
        }
        return "URL not found!";
    }
};

int main() {
    URLShortener urlShortener;
    string longURL, shortURL;

    cout << "Enter a long URL to shorten: ";
    getline(cin, longURL);

    shortURL = urlShortener.shortenURL(longURL);
    cout << "Shortened URL: " << shortURL << endl;

    cout << "Enter the shortened URL to retrieve the original: ";
    string inputShortURL;
    getline(cin, inputShortURL);

    string retrievedURL = urlShortener.getOriginalURL(inputShortURL);
    cout << "Retrieved Original URL: " << retrievedURL << endl;

    return 0;
}

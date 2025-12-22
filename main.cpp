#include <iostream>
#include <iomanip>
#include <string>
using namespace std;
class Book {
private:
    string title;
    string author;
    string isbn;
    int copies;

public:
    // Constructor to initialize book data
    Book(string t, string a, string i, int c)
        : title(t), author(a), isbn(i), copies(c) {}

    // Getter methods to access book details
    string getTitle() const { return title; }
    string getAuthor() const { return author; }
    string getISBN() const { return isbn; }
    int getCopies() const { return copies; }

    // Setter methods to update book details
    void setTitle(std::string t) { title = t; }
    void setAuthor(std::string a) { author = a; }
    void setCopies(int c) { copies = c; }

    // Display book details in a formatted way
    void display() const {
        cout << left << std::setw(25) << title
                  << setw(20) << author
                  << setw(15) << isbn
                  << setw(10) << copies << "\n";
    }
};

import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {
    state = {
     searchedBooks: [],
     query: null
    }

    /**
    * @description Searches for a book with a given search phrase
    * @param {string} searchPhrase - The search phrase
    */
    searchBooks(searchPhrase) {
      BooksAPI.search(searchPhrase)
        .then((searchResult) => {
            const items = searchResult && !searchResult.error ? searchResult : [];
            this.setState({searchedBooks: items, query: searchPhrase});
        });
    }

    render() {
        const onBookStateChange = this.props.onBookStateChange;
        return (
            <div className="search-books">
            <div className="search-books-bar">
             <Link href="#" to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input id="search-text" type="text" placeholder="Search by title or author" onChange={(event)=> this.searchBooks(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
                {this.state.searchedBooks.length > 0 && (
                  <BooksGrid books={this.state.searchedBooks} onBookStateChange={onBookStateChange}/>
                )}

                {this.state.query && this.state.searchedBooks.length === 0 && (
                  <div>No books have been found</div>
                )}
            </div>
          </div>  
        )
    }
}

export default SearchBooks
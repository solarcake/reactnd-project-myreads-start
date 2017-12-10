import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({books});
      });
  }

  /**
    * @description Changes the state of a book which is held in the state object
    * @param {string} update - The shelf update
    * @param {string} book - The book to refresh the state with
    */
  changeBookState(update, book) {
      // update books up
      BooksAPI.update(book, update);

      //update state based on new book or existing book
      this.setState((state) => {
          let books = state.books.slice();
          let updateBook = books.find((u) => {
              return u.id === book.id;
          });

          if(!updateBook) {
            book.shelf = update;
            books.push(book);
          } else {
            updateBook.shelf = update;
          }
      
          return {
            books: books
          };
      });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (<ListBooks books={this.state.books} onBookStateChange={this.changeBookState.bind(this)}/>)}/>
        <Route exact path="/search" render={() => (<SearchBooks onBookStateChange={this.changeBookState.bind(this)}/>)}/>
      </div>
    )
  }
}

export default BooksApp

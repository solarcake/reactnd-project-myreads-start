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

  changeBookState(update, book) {
      book.shelf = update;
      BooksAPI.update(book, update);
      this.setState((state) => {
          let books = state.books.slice();
          let updateBook = books.find((u) => {
              return u.id === book.id;
          });

          if(!updateBook) {
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

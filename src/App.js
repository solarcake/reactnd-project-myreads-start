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
    * @param {string} shelf - The shelf update
    * @param {string} book - The book to refresh the state with
    */
  changeBookState(shelf, book) {
    if(book.shelf !== shelf) {
        BooksAPI.update(book, shelf).then(() => {
          book.shelf = shelf;
          this.setState((state) => ({
                books: state.books.filter((b) => b.id !== book.id).concat( [book] )
          }));
        });
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (<ListBooks books={this.state.books} onBookStateChange={this.changeBookState.bind(this)}/>)}/>
        <Route exact path="/search" render={() => (<SearchBooks books={this.state.books} onBookStateChange={this.changeBookState.bind(this)}/>)}/>
      </div>
    )
  }
}

export default BooksApp

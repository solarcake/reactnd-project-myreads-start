import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (<ListBooks/>)}/>
        <Route exact path="/search" render={() => (<SearchBooks/>)}/>
      </div>
    )
  }
}

export default BooksApp

import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

const bookTypes = {
  currentlyReading: "currentlyReading",
  wantToRead: "wantToRead",
  read: "read"
};

class ListBooks extends Component {
    static propTypes  = {
      books: PropTypes.array.isRequired
    };

    render() {
        const { books , onBookStateChange} =  this.props
        const currentlyReading = books.filter((book)=> book.shelf === bookTypes.currentlyReading);
        const wantToRead = books.filter((book)=> book.shelf === bookTypes.wantToRead);
        const read = books.filter((book)=> book.shelf === bookTypes.read);
        return (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1 >MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                          <BooksGrid books={currentlyReading} onBookStateChange={onBookStateChange}/>
                        </div>
                      </div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                          <BooksGrid books={wantToRead} onBookStateChange={onBookStateChange}/>
                        </div>
                      </div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                        <BooksGrid books={read} onBookStateChange={onBookStateChange}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="open-search">
                      <Link href="#search" to="/search">Search books</Link>
                  </div>
                </div> 
        )
    }
}

export default ListBooks
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ListBookDetail from './ListBookDetail'
import * as BooksAPI from './BooksAPI'

 class SearchBooks extends Component {
    state = {
      books: []
    }
    componentDidMount() {
      BooksAPI.getAll().then(books => this.setState({ books}))
    }

    renderBooks() {
      return this.state.books.map((item, index) => {
        return <ListBookDetail key={index} books={item} />
      })
    }
     render() {
         return (
           <div className="search-books">
             <div className="search-books-bar">
               <Link
                 to='/search'
                 className='close-search'
                 >Close</Link>
               <div className="search-books-input-wrapper">
                 <input type="text" placeholder="Search by title or author"/>
               </div>
             </div>
             <div className="search-books-results">
               <ol className="books-grid">
                 {this.renderBooks()}
               </ol>
             </div>
           </div>
         );
     }
 }

 export default SearchBooks;

import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import ListBookDetail from './ListBookDetail'
import * as BooksAPI from './BooksAPI'


 class ListBooks extends Component {
   state = {
     books: []
   }

   organizeBooks(books) {
     this.setState({books})
   }

   componentDidMount() {
     BooksAPI.getAll().then(books => this.organizeBooks(books))
   }

   handleBookShelf(book, shelf) {
     BooksAPI.update(book, shelf).then(books => this.organizeBooks(books))
   }

     render() {
       const {books} = this.state;

       const matchCR = new RegExp(escapeRegExp('currentlyReading'))
       let currentlyReading = books ? books.filter(book => matchCR.test(book.shelf)) : null

       const matchWR = new RegExp(escapeRegExp('wantToRead'))
       let wantToRead = books ? books.filter(book => matchWR.test(book.shelf)) : null

       const matchR = new RegExp(escapeRegExp('read'))
       let read = books ? books.filter(book => matchR.test(book.shelf)) : null

         return (
           <div className="list-books">
             <div className="list-books-title">
               <h1>MyReads</h1>
             </div>
             <div className="list-books-content">
               <div>
                 <div className="bookshelf">
                   <h2 className="bookshelf-title">Currently Reading</h2>
                   <div className="bookshelf-books">
                     <ol className="books-grid">
                       {currentlyReading.map((book, index) =>
                         <ListBookDetail
                           key={index}
                           book={book}
                            handleBookShelf={this.handleBookShelf.bind(this)}
                          />)}
                     </ol>
                   </div>
                 </div>
                 <div className="bookshelf">
                   <h2 className="bookshelf-title">Want to Read</h2>
                   <div className="bookshelf-books">
                     <ol className="books-grid">
                       {wantToRead.map((book, index) =>
                       <ListBookDetail
                         key={index}
                         book={book}
                        handleBookShelf={this.handleBookShelf.bind(this)}
                      />)}
                     </ol>
                   </div>
                 </div>
                 <div className="bookshelf">
                   <h2 className="bookshelf-title">Read</h2>
                   <div className="bookshelf-books">
                     <ol className="books-grid">
                       {read.map((book, index) =>
                       <ListBookDetail
                         key={index}
                         book={book}
                          handleBookShelf={this.handleBookShelf.bind(this)}
                        />)}
                     </ol>
                   </div>
                 </div>
               </div>
             </div>
             <div className="open-search">
               <Link
                 to="/"
                 >Add a book </Link>
             </div>
           </div>
         );
     }
 }

 export default ListBooks;

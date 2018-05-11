import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ListBookDetail from './ListBookDetail'
import * as BooksAPI from './BooksAPI'

 class SearchBooks extends Component {
    state = {
      books: [],
      query: ''
    }
    componentDidMount() {
      BooksAPI.getAll().then(books => this.setState({ books}))
    }

    renderBooks(books) {
      if(books) {
        return this.state.books.map((item, index) => {
          return <ListBookDetail key={index} book={item} />
        })
      }
    }

    handleUpdateQuery(query) {
      this.setState({query})
      BooksAPI.search(this.state.query)
        .then(books => books.error?[] : this.setState({books}))
        .catch(err => console.log('search with error: ', err))
    }
    renderSearchResults() {
      console.log(this.state.query)
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
                 <input
                   type="text"
                   placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={e => this.handleUpdateQuery(e.target.value)}
                  />
               </div>
             </div>
             <div className="search-books-results">
               <ol className="books-grid">
                 {this.renderSearchResults()}
                 {this.renderBooks(this.state.books)}
               </ol>
             </div>
           </div>
         );
     }
 }

 export default SearchBooks;

import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import ListBookDetail from './ListBookDetail'
import * as BooksAPI from './BooksAPI'

 class SearchBooks extends Component {
    state = {
      books: [],
      query: ''
    }

    handleUpdateQuery(query) {
      BooksAPI.search(query)
        .then(books => books ? this.setState({books}) : [])
        .catch(err => console.log('search with error: ', err))
      this.setState({query})
    }

    renderSearchResults() {
      const {books, query} = this.state

      if(query) {
        return books.error ?
          <div>
            No results found
          </div> : books.map((item, index) => {
            return <ListBookDetail key={index} book ={item}/>
          })
      }
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
               </ol>
             </div>
           </div>
         );
     }
 }

 export default SearchBooks;

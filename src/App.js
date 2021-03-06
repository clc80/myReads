import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import {Route} from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (<div className="app">
      <Route exact="exact" path="/" component={ListBooks}/>
      <Route path="/search" component={SearchBooks}/>
    </div>)
  }
}

export default BooksApp

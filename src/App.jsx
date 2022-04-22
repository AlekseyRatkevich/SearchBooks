import React, { useState } from 'react'
import { InputGroup, Input, Button, FormGroup, Label, Spinner } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Bookcard from './modules/Bookcard'
import './App.css'
import 'animate.css'

function App() {
  const [category, setCategory] = useState('All')
  const [sorting, setSorting] = useState('Relevance')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([])
  const [totalCards, setTotalCards] = useState(0)
  const [limit, setLimit] = useState(30)
  const [startIndex, setStartIndex] = useState(0)

  function fetchCards() {
    setSorting('Relevance')
    setCards([])
    setStartIndex(0)
    setLoading(true)
    setLimit(30)
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=30&key=AIzaSyAJWywK7LvQo2J6I0Vws0UxsmzZHFCzsVg`)
      .then(res => res.json())
      .then(data => {
        if (data.totalItems > 0) {
          setTotalCards(data.totalItems)
          setLoading(false)
          if (category === 'All') {
            setCards(data.items)
          } else {
            data.items.forEach(item => {
              if (item.volumeInfo.hasOwnProperty('categories')) {
                if (item.volumeInfo.categories.toString().includes(category)) {
                  setCards(cards => [...cards, item])
                  setLoading(false)
                }
              }
            })
          }
        } else {
          setLoading(false)
          setTotalCards(0)
          setCards([])
          toast.error('No books for your request / Enable VPN / Too many requests a day')
        }
      })
      .catch(err => {
        setLoading(false)
        toast.error(`${err.data.error.message}`)
      })
  }

  function onChangeCategory(e) {
    setCategory(e.target.value)
  }
  function onChangeSorting(e) {
    setSorting(e.target.value)
  }
  function onChangeQuery(e) {
    setQuery(e.target.value)
  }
  function handleEnterPressed(e) {
    if (e.key === 'Enter') {
      fetchCards()
    }
  }

  function Header() {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column main-image">
        <h1 className="display-5">Search for books</h1>
        <div style={{ width: '60%' }}>
          <InputGroup size='lg' className='mb-3'>
            <Input value={query} onChange={onChangeQuery} placeholder='Type here' onKeyPress={handleEnterPressed} />
            <Button color='secondary' onClick={fetchCards}>
              <i className='fas fa-search'></i>
            </Button>
          </InputGroup>
          <div className="d-flex justify-content-center">
            <FormGroup style={{ 'margin-right': '2rem' }}>
              <Label for='categories'>Categories</Label>
              <Input type={'select'} value={category} onChange={onChangeCategory}>
                <option value={'All'}>All</option>
                <option value={'Art'}>Art</option>
                <option value={'Biography'}>Biography</option>
                <option value={'Computers'}>Computers</option>
                <option value={'History'}>History</option>
                <option value={'Medical'}>Medical</option>
                <option value={'Poetry'}>Poetry</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='categories'>Sorting by</Label>
              <Input type={'select'} value={sorting} onChange={onChangeSorting}>
                <option value={'Relevance'}>Relevance</option>
                <option value={'Newest'}>Newest</option>
                <option value={'Oldest'}>Oldest</option>
              </Input>
            </FormGroup>
          </div>
          <div className="d-flex totalCards justify-content-center">
            <p>Finded: {totalCards} books</p>
          </div>
        </div>
      </div>
    )
  }

  function addMoreCards() {
    setLimit(limit + 30)
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex + limit}&maxResults=30&key=AIzaSyAJWywK7LvQo2J6I0Vws0UxsmzZHFCzsVg`)
      .then(res => res.json())
      .then(data => {
        if (data.totalItems > 0) {
          setCards(cards.concat(data.items))
        }
      })
      .catch(err => {
        toast.error(`${err.data.error.message}`)
      })
  }

  function loadMoreBtn() {
    if (cards.length < totalCards) {
      return (
        <div className="d-flex justify-content-center mb-5" onClick={() => addMoreCards()}>
          <button style={{ 'background': 'transparent', 'border': 'none', 'color': 'gray', 'margin': '0 auto' }}>Load More</button>
        </div>
      )
    }
  }

  function handleCards() {
    let slice = cards.slice(0, limit)
    const sortedItems = slice.sort((a, b) => {
      if (sorting === 'Newest') {
        return parseInt(b.volumeInfo.publishedDate.substring(0, 4)) - parseInt(a.volumeInfo.publishedDate.substring(0, 4))
      }
      else if (sorting === 'Oldest') {
        return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4))
      }
      else {
        return cards
      }
    })

    const items = sortedItems.map(item => {
      if (item.volumeInfo.hasOwnProperty('publishedDate') === false) {
        item.volumeInfo['publishedDate'] = '0000'
      }
      if (item.volumeInfo.hasOwnProperty('categories') === false) {
        item.volumeInfo['categories'] = ''
      }
      let firstCategory = item.volumeInfo.categories.toString().split('&')[0]
      let categoryOfItem = item.volumeInfo.categories
      let thumbnail = ''
      if (item.volumeInfo.hasOwnProperty('imageLinks') === false) {
        item.volumeInfo['imageLinks'] = { thumbnail: 'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg' }
      } else {
        thumbnail = item.volumeInfo.imageLinks.thumbnail
      }
      return (
        <div className="mb-5 animate__animated animate__fadeInUp" key={item.id}>
          <Bookcard
          thumbnail={thumbnail}
          title = {item.volumeInfo.title}
          publishedDate={item.volumeInfo.publishedDate}
          pageCount={item.volumeInfo.pageCount}
          language={item.volumeInfo.language}
          authors={item.volumeInfo.authors}
          publisher={item.volumeInfo.publisher}
          description={item.volumeInfo.description}
          previewLink={item.volumeInfo.previewLink}
          infoLink={item.volumeInfo.infoLink}
          firstCategory={firstCategory}
          categoryOfItem={categoryOfItem}
          />
        </div>
      )
    })
    if (loading) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <Spinner style={{ width: '3rem', height: '3rem', color: 'black' }} />
        </div>
      )
    } else {
      return (
        <div className="container my-5">
          <div className="cards-container">{items}</div>
          {loadMoreBtn()}
        </div>
      )
    }
  }
  return (
    <div>
      {Header()}
      {handleCards()}
      <ToastContainer />
    </div>
  )
}

export default App

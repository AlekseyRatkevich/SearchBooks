import React, { useState } from 'react'
import {Card, CardTitle, CardImg, CardBody, Button, Modal} from 'reactstrap'

const Bookcard = ({
  thumbnail, title, pageCount, language, description, authors, publisher, previewLink, infoLink, category }) => {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  return (
    <Card className="m-auto card" style={{'width': '233px', 'height': '400px'}}>
          <CardImg top style=
          {{ width: '100%', 'height': '243px' }}
          src={thumbnail}
          alt={title}/>
      <CardBody>
        <div className='card-authors'>{authors}</div>
        <CardTitle className='card-title'>{title}</CardTitle>
        <div className="card-category">{category}</div>
        <Button onClick={toggle}>More info</Button>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle}>
        <div className='modal-header d-flex justify-content-center'>
          <h5 className='modal-title text-center' id='exampleModalLabel'>
            {title}
          </h5>
          <button
            aria-label='Close'
            className='close'
            type='button'
            onClick={toggle}
          >
            <span aria-hidden={true} className='close'>X</span>
          </button>
        </div>
        <div className='modal-body'>
          <div className='d-flex justify-content-between'>
            <img src={thumbnail} alt={title} style={{ height: '233px', width:'50%'}} />
            <div className='card-info'>
              <p>Page Count: {pageCount}</p>
              <p>Language : {language}</p>
              <p>Authors : {authors}</p>
              <p>Publisher : {publisher}</p>
              <p>Categories : {category}</p>
            </div>
          </div>
          <div className='mt-3'>{description}</div>
        </div>
        <div className='modal-footer'>
          <div>
            <a
              href={previewLink}
              className='btn-link'
              color='default'
              type='button'
              target='_blank'
              rel='noopener noreferrer'
            >
              Preview Link
            </a>
          </div>
          <div className='divider'></div>
          <div>
            <a
              href={infoLink}
              className='btn-link'
              color='default'
              type='button'
              target='_blank'
              rel='noopener noreferrer'
            >
              Info Link
            </a>
          </div>
        </div>
      </Modal>
    </Card>
  )
}

export default Bookcard
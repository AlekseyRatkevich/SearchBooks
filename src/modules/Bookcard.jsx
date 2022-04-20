import React, { useState } from 'react'
import {Card, CardTitle, CardImg, CardBody, Button, Modal} from 'reactstrap'

const Bookcard = ({
  thumbnail, title, publishedDate, pageCount, language, description, authors, publisher, previewLink, infoLink, categoryOfItem }) => {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  if (publishedDate === '0000') {
    publishedDate = ''
  }
  return (
    <Card className="m-auto card" style={{ 'width': '233px', 'height': '350px', cursor: 'pointer' }} onClick={toggle}>
          <CardImg top style=
          {{ width: '100%', 'height': '243px' }}
          src={thumbnail}
          alt={title}/>
      <CardBody>
        <CardTitle className='card-title'>{title}</CardTitle>
        <div className='card-authors'>{authors}</div>
        <div className="card-published-date">{publishedDate.substring(0, 4)}</div>
        <div className="card-category">{categoryOfItem}</div>
        {/* <Button onClick={toggle} style={{overflow: 'hidden'}}>More info</Button> */}
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
              <p><span className='info-span'>Page Count :</span> {pageCount}</p>
              <p><span className='info-span'>Language :</span> {language}</p>
              <p><span className='info-span'>Authors :</span> {authors}</p>
              <p><span className='info-span'>Publisher :</span> {publisher}</p>
              <p><span className='info-span'>Published date:</span> {publishedDate}</p>
              <p><span className='info-span'>Categories :</span> {categoryOfItem}</p>
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
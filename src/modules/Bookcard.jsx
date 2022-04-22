import React, { useState } from 'react'
import {Card, CardTitle, CardImg, CardBody, Modal} from 'reactstrap'

const Bookcard = ({
  thumbnail, title, publishedDate, pageCount, language, description, authors, publisher, previewLink, infoLink, categoryOfItem, firstCategory }) => {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  if (publishedDate === '0000') {
    publishedDate = ''
  }
  return (
    <Card className="m-auto card" style={{ 'width': '233px', 'height': '350px', cursor: 'pointer' }} onClick={toggle}>
      <CardImg top style={{ width: '100%', 'height': '243px' }} src={thumbnail} alt={title}/>
      <CardBody>
        <CardTitle className='card-title'>{title}</CardTitle>
        <div className='card-authors'>{authors}</div>
        <div className="card-published-date">{publishedDate.substring(0, 4)}</div>
        <div className="card-category">{firstCategory}</div>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle} className="modal-container">
        <div className='modal-header'>
          <h5 className='modal-title text-center'>{title}</h5>
          <button className='close' type='button' onClick={toggle}>
            <i className="fa-solid fa-xmark close"></i>
          </button>
        </div>
        <div className='modal-body'>
          <div className='d-flex justify-content-between'>
            <img src={thumbnail} alt={title} style={{ height: '233px', width:'60%'}} />
            <div className='card-info'>
              <p><span className='info-span'>Authors :</span> {authors}</p>
              <p><span className='info-span'>Categories :</span> {categoryOfItem}</p>
              <p><span className='info-span'>Language :</span> {language}</p>
              <p><span className='info-span'>Page Count :</span> {pageCount}</p>
              <p><span className='info-span'>Publisher :</span> {publisher}</p>
              <p><span className='info-span'>Published date:</span> {publishedDate}</p>
            </div>
          </div>
          <div className='mt-3 card-description'>{description}</div>
        </div>
        <div className='modal-footer'>
          <div>
            <a href={previewLink} className='btn-link' target='_blank' rel="noreferrer">Preview Link</a>
          </div>
          <div className='divider'></div>
          <div>
            <a href={infoLink} className='btn-link' target='_blank' rel="noreferrer">Info Link</a>
          </div>
        </div>
      </Modal>
    </Card>
  )
}

export default Bookcard
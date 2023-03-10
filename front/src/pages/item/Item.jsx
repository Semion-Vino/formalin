import React from 'react';
import './item.css'

const Item = () => {



  return( 
      <div className='item section__padding'>
        <div className="item-image">
        </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1>Abstact Smoke Red Blue</h1>
              <p>From <span>4.5 ETH</span> ‧ 20 of 25 available</p>
            </div>
            <div className="item-content-creator">
              <div><p>Creater</p></div>
              <div>
                <p>Rian Leon </p>
              </div>
            </div>
            <div className="item-content-detail">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </div>
            <div className="item-content-buy">
              <button className="primary-btn">Buy For 4.5 ETH</button>
              <button className="secondary-btn">Make Offer</button>
            </div>
          </div>
      </div>
  )
};

export default Item;

import React from 'react'
import './header.css'
import form from '../../assets/form.png'
import { Link } from 'react-router-dom'
const Header = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        }
      }
    ]
  };
  return (
    <div className='header section__padding'>
      <div className="header-content">
        <div>
          <div className="text">
            <h1>Get insights quickly, with Formalin.</h1>
            {/*  <small>Easily create and share online forms and surveys, and analyze responses</small> */}
            <img className='shake-vertical' src={form} alt="" />
          </div>
        </div>
      </div>
      <h2>Welcome to <span className='formalin'>Formalin</span></h2>
      <p>the ultimate online platform for creating and distributing forms and polls! With our user-friendly interface and advanced features, you can easily create custom surveys, questionnaires, feedback forms, and more in just a few clicks.</p>
      <br />
      <p>Our platform is designed to help businesses, educators, researchers, and individuals gather the insights they need to make informed decisions. Whether you're looking to collect feedback from customers, conduct market research, or simply get opinions on a topic, <span className='formalin'>Formalin</span> has everything you need to get started.</p>
      <br />
      <p>So whether you're a startup, a school, or just someone looking to gather information from others, <span className='formalin'>Formalin</span> is the perfect tool for creating forms and polls that get results. Sign up today and start building your custom form or poll in minutes!</p>
      <Link to='/create' className='home-button'>

        <button className="primary-btn">Start creating forms</button>
      </Link>
    </div>
  )
}

export default Header

import React from 'react'
import './my-forms.css'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
const Forms = ({ title }) => {
  const [cookies, setCookie] = useCookies(['user']);
  const [userForms, setUserForms] = useState([]);
  const [initialUserForms, setInitialUserForms] = useState([]);
  //-------------------------------------
  useEffect(() => {
    fetch(`/form/get-forms/${cookies.user._id}`)
      .then((response) => response.json())
      .then((res) => {
        setUserForms(res.data)
        setInitialUserForms(res.data)
      })
  }, []);

  //-------------------------------------
  const deleteForm = id => {

    Swal.fire({
      title: 'Delete this form?',
      confirmButtonText: 'yes',
      showCancelButton: true,
      cancelButtonText: 'no',
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetch(`/form/delete/${id}`, {
          method: "delete",
        }).then((response) => response.json())
          .then((res) => {
            Swal.fire({
              icon: res.success ? 'success' : 'error',
              title: res.success ? 'Deleted successfully' : 'Something went wrong',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              position: 'top-end',
              toast: true,
            })
            const newFormsArray = initialUserForms.filter(e => e._id != id)
            setInitialUserForms(newFormsArray);
            setUserForms(newFormsArray)
          });

      }
    })

  }
  //-------------------------------------
  const searchForms = val => {
    setUserForms(initialUserForms.filter(e => e.name.includes(val)))
  }
  //-------------------------------------
  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          <div className="profile-bottom-input">
            <input type="text" placeholder='Search form' onChange={e => searchForms(e.target.value)} />
          </div>
          {userForms.length === 0 ? <div className="no-forms">
            <h2 className='no-forms'>No Forms yet</h2>
            <Link to={'/create'} class="load-more">
              <button>Create a form</button>
            </Link>
          </div> :

            <div className="my-forms-wrap">

              <div className="userforms-wrap">

                {userForms.map(e => (

                  <div className="bids-card">
                    <span className="delete" onClick={k => deleteForm(e._id)}>X</span>
                    <div className="bids-card-top">
                      <p className="bids-title">{e.name}</p>
                    </div>
                    <div className="bids-card-bottom">
                      <p>{e.description}</p>
                      <p>{e.answers.length} Submits</p>
                    </div>
                    <div className="bids-card-bottom">
                      <Link to={`/form/${e._id}`}><button className='primary-btn'>Go to form</button></Link>
                      <Link to={`/form/results/${e._id}`}><button className='secondary-btn'>See results</button></Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Forms

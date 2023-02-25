import React from 'react';
import './profile.css'
import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/profile.png'
import Forms from '../../components/my-forms/My-forms'
import { useCookies } from 'react-cookie';
import { useNavigate, Navigate } from 'react-router-dom';

const Profile = () => {
  const [cookies, setCookie] = useCookies(['user']);
  if (!cookies.user) {
    return <Navigate replace to="/login" />;
  }
  return (
    <div className='profile section__padding'>
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
            <img src={profile_pic} alt="profile" />
            <h3>{cookies.user.fullName}</h3>
        </div>
      </div>
      <div className="profile-bottom">
       
        <Forms   title="My forms" />
      </div>
    </div>
  );
};

export default Profile;

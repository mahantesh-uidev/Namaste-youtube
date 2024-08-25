import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);

  // Early return pattern
  if(!isMenuOpen) return null;

  return (
    <div className="p-5 shadow-lg w-48">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>Shorts</li>
        <li>Live</li>
      </ul>
      <h1 className='font-bold pt-3'>Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
      <h1 className='font-bold pt-3'>Watch Later</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
      <h1 className='font-bold pt-3'>Explore</h1>
      <ul>
        <li>Trending</li>
        <li>Shopping</li>
        <li>News</li>
        <li>Fashion & Beauty</li>
      </ul>
    </div>
  )
}

export default Sidebar;
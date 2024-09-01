import React from 'react'
import { valueConverter } from '../utils/helper';
import moment from 'moment';

const VideoCard = ({info}) => {
    const {snippet, statistics} = info;
    const {channelTitle, title, thumbnails, publishedAt} = snippet;
  return (
    <div className='p-2 m-2 w-64 shadow-lg'>
        <img className='rounded-lg' src={thumbnails.medium.url} alt='thumbnail' />
        <ul>
            <li className='font-bold py-2'>{title}</li>
            <li>{channelTitle}</li>
            <li>{valueConverter(statistics.viewCount)} views &bull; {moment(publishedAt).fromNow()}</li>
        </ul>
    </div>
  )
}

export default VideoCard;
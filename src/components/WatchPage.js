import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
// import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';
import { valueConverter } from '../utils/helper';
import moment from 'moment';

const WatchPage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(closeMenu());
    }, [dispatch]);
    const [apiData, setApiData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const fetchVideoData = async () => {
      // Fetching Videos Data
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${searchParams.get("v")}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]));
    }
    const fetchCommentData = async () => {
      // Fetching comments data
      const comments_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${searchParams.get("v")}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      await fetch(comments_url).then(res=>res.json()).then(data=>setCommentData(data.items));
    }
    useEffect(() => {
      fetchVideoData();
      fetchCommentData();
    }, []);
  return (
    <div className='flex flex-col'>
    <div className='px-5 flex'>
      <div className='border rounded-xl'>
        <iframe width="850" height="540" className='rounded-xl' src={"https://www.youtube.com/embed/"+searchParams.get("v")+"?autoplay=1"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      <div className='w-full'>
        <LiveChat />
      </div>
    </div>
    <div className='mt-2 px-5 w-2/3'>
      <h2 className='font-bold text-2xl'>{apiData ? apiData.snippet.title : "Title Here"}</h2>
      <div className='mt-2 flex justify-between items-center'>
      <div className='flex mt-3'>
        <div className='flex items-center mr-2'>
          <img className='h-8 w-8 mr-2 rounded-full object-cover' src={apiData ? apiData.snippet.thumbnails.default.url : "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"} alt="channel icon" />
          <div>
            <h2 className='font-bold text-xl'>{apiData ? apiData.snippet.channelTitle : "Channel Title"}</h2>
            <span className='text-xs block -mt-[2px]'>1.05M Subscribers</span>
          </div>
        </div>
          <button type='button' className='bg-gray-300 px-5 py-2 rounded-full mr-2'>Join</button>
          <button type='button' className='bg-black px-3 py-2 text-white rounded-full'>Subscribe</button>
      </div>
        <div type='button' className='flex items-center'>
          <span className='flex items-center'><img className='h-6 mr-1' src="https://png.pngitem.com/pimgs/s/129-1293150_file-like-svg-wikimedia-commons-png-youtube-blue.png" alt="like icon" />{apiData ? valueConverter(apiData.statistics.likeCount) : "16K"}</span>
          <span className='mr-5'><img className='h-6' src="data:image/png;base64,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" alt="dislike icon" /></span>
          <span className='flex items-center'><img className='h-6 mr-1' src="data:image/png;base64,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" alt="share icon" />Share</span>
          <span className='flex items-center'><img className='h-9' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTboW4xWr5kseu8bdW4uK7gRwupB0YxGj7ZOA&s" alt="download icon" />Download</span>
        </div>
      </div>
      <hr className='m-2' />
      <div className='bg-slate-200 rounded-lg p-2 mt-3'>
      <p className='font-bold'>{apiData ? valueConverter(apiData.statistics.viewCount) : "16K"} Views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : null} <span className='font-normal'>#{apiData ? apiData.snippet.tags[0] : null}</span></p>
        <p>{apiData ? apiData.snippet.description.slice(0,280) : "Video Description Title"}</p>
      </div>
      <div className='m-4'>
        <h2 className='text-xl font-bold'>{apiData ? valueConverter(apiData.statistics.commentCount) : "1K"} Comments</h2>
        {
          commentData.map((item, index) => {
            return (
                    <div key={index} className='flex items-start justify-start mr-2 mb-3'>
                      <img className='h-10 w-10 mr-2 mt-2 rounded-full object-cover' src={item? item.snippet.topLevelComment.snippet.authorProfileImageUrl : "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" } alt="user icon" />
                      <div>
                        <h2 className='font-bold text-md'>{item ? item.snippet.topLevelComment.snippet.authorDisplayName : "Channel Title"} <span className='text-xs text-gray-400'>{item ? moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow() : null}</span></h2>
                        <span className=''>{item ? item.snippet.topLevelComment.snippet.textDisplay : "Comment text here"} </span>
                        <div className='flex items-center'>
                          <span className='flex items-center'><img className='h-4 mr-1' src="https://png.pngitem.com/pimgs/s/129-1293150_file-like-svg-wikimedia-commons-png-youtube-blue.png" alt="like icon" />{item ? valueConverter(item.snippet.topLevelComment.snippet.likeCount) : ""}</span>
                          <span className='ml-3'><img className='h-4' src="data:image/png;base64,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" alt="dislike icon" /></span>
                        </div>
                      </div>
                    </div>
            );
          })
        }
        
      </div>
    </div>
    
    {/* <CommentsContainer /> */}

    
    </div>
  )
}

export default WatchPage;
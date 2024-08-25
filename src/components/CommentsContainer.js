import React from 'react';

const commentsData = [
    {
        name: "Mahantesh Hiremath",
        text: "lorem ipsum xjasjhkuu njcch axiwiwidi",
        replies: [],
    },
    {
        name: "Mahantesh Hiremath",
        text: "lorem ipsum xjasjhkuu njcch axiwiwidi",
        replies: [
            {
                name: "Mahantesh Hiremath",
                text: "lorem ipsum xjasjhkuu njcch axiwiwidi",
                replies: [],
            }
        ],
    },
    {
        name: "Mahantesh Hiremath",
        text: "lorem ipsum xjasjhkuu njcch axiwiwidi",
        replies: [
            {
                name: "Mahantesh Hiremath",
                text: "lorem ipsum xjasjhkuu njcch axiwiwidi",
                replies: [
                    {
                        name: "Mahantesh Hiremath",
                        text: "lorem ipsum xjasjhkuu njcch axiwiwidi",
                        replies: [
                            {
                                name: "Mahantesh Hiremath",
                                text: "lorem ipsum xjasjhkuu njcch axiwiwidi",
                                replies: [
                                    {
                                        name: "Mahantesh Hiremath",
                                        text: "lorem ipsum xjasjhkuu njcch axiwiwidi",
                                        replies: [],
                                    }
                                ],
                            }
                        ],
                    }
                ],
            }
        ],
    }
];

const Comment = ({data}) => {
    const { name, text, replies } = data;
    return(
        <div className='flex shadow-sm bg-gray-100 p-2 rounded-lg my-2'>
            <img className='h-12 w-12' alt='user' src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'/>
            <div className='px-3'>
                <p className='font-bold'>{name}</p>
                <p>{text}</p>
            </div>
        </div>
    );
}

const CommentsList = ({comments}) => {
    return comments.map((comment, index) => (
    <div key={index}>
        <Comment data={comment} />
        <div className='pl-5 ml-5 border border-l-black'>
            <CommentsList comments={comment.replies}/>
        </div>
    </div>
    ));
};

const CommentsContainer = () => {
  return (
    <div className='m-5 p-2'>
        <h1 className='font-bold text-2xl mb-2'>Comments: </h1>
        <CommentsList comments={commentsData} />
    </div>
  )
}

export default CommentsContainer;
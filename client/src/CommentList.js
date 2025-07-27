

const CommentList = ({ comments }) => {
  

  const renderedComments = Object.values(comments).map((comment) => {
    let content; 

    if (comment.status  === 'approved'){
      content = comment.content; 
    }

    if (comment.status  === 'pending'){
      content = 'this comment is awaiting moderation '; 
    }

    if (comment.status  === 'rejected'){
      content = 'This comment has been rejected '; 
    }

    return (
      <li key={comment.id} >
        {content}
      </li>
    );
  });

  return (
    <div>
      <i>{comments.length} comments</i>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;

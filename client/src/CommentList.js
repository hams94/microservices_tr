

const CommentList = ({ comments }) => {
  

  const renderedComments = Object.values(comments).map((comment) => {
    return (
      <li key={comment.id} >
        <h3>{comment.content}</h3>
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

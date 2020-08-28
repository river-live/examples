export const comments = (state = [], action) => {
  switch (action.type) {
    case "COMMENTS_FETCHED":
      // return state.concat(action.payload.comments);
      const commentsWithoutReplies = action.payload.comments.reduce(
        (acc, comment) => {
          const { replies, ...commentWithoutReplies } = comment;
          return acc.concat(commentWithoutReplies);
        },
        []
      );
      return state.concat(commentsWithoutReplies);

    case "COMMENT_ADDED":
      // check if comment is already there, idempotency!
      const found = state.find((comment) => {
        return comment.id === action.payload.newComment.id;
      });

      if (found) {
        return state;
      }
      return state.concat(action.payload.newComment);

    case "REPLY_ADDED":
      // increment count of replies by one
      return state.map((comment) => {
        if (comment.id === action.payload.newReply.comment_id) {
          const newAmount = comment.replies_count + 1;
          return Object.assign({}, comment, {
            replies_count: newAmount,
          });
        } else {
          return comment;
        }
      });

    default:
      return state;
  }
};

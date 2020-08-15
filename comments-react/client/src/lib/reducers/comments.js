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
      return state.concat(action.payload.newComment);

    default:
      return state;
  }
};

const UPDATE_USER = async (_, args, context) => {
  const { user } = context;
  if (!user) {
    throw new ApolloError("illegal User", "401");
  } else {
    let { id, email, phone } = args;
  }
};

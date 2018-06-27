export const getDefaultUser = () => ({
  user: 'javier',
  name: 'javier Orrillo',
});

export const signIn = (ctx, user, password) => {
  console.log('Input Data', { user, password });
  return {
    user,
    name: `Javier Orrillo - ${user}`,
    password, // only for testing purposes
  };
};

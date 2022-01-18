const homeGaurd = async (to, from, next) => {
  const userName = sessionStorage.userName;
  if (userName) next();
  else next({ path: 'login' });
};

export default homeGaurd;
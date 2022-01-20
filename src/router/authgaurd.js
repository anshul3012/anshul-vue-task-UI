const homeGaurd = (to, from, next) => {
  const userName = sessionStorage.userName;
  if (userName) next();
  else next({ path: 'login' });
};

const anshul = (to, from, next) => {
  if (sessionStorage.userName === 'dev') next();
  // else next({ path: '/' });
}

export default { homeGaurd, anshul };
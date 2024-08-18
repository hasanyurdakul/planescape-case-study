// ######################################################################
// Token'ı localStorage'dan okur
// ######################################################################

export const getToken = () => {
  return localStorage.getItem("planescapetoken");
};

// ######################################################################
// Token'ı localStorage'a yazar
// ######################################################################

export const setToken = (token) => {
  localStorage.setItem("planescapetoken", token);
};

// ######################################################################
// Token'ı localStorage'dan siler
// ######################################################################

export const removeToken = () => {
  localStorage.removeItem("planescapetoken");
};

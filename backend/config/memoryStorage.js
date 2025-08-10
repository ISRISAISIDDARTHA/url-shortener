// In-memory storage for fallback when MongoDB is not available
export const users = new Map();
export const urls = new Map();

export const addUser = (user) => {
  users.set(user.email, user);
  return user;
};

export const findUserByEmail = (email) => {
  return users.get(email);
};

export const findUserById = (id) => {
  for (const [email, user] of users.entries()) {
    if (user.id === id) {
      return user;
    }
  }
  return null;
};

export const addUrl = (url) => {
  urls.set(url.urlCode, url);
  return url;
};

export const findUrlByCode = (code) => {
  return urls.get(code);
};

export const findUrlsByUserId = (userId) => {
  const userUrls = [];
  for (const [code, url] of urls.entries()) {
    if (url.userId === userId) {
      userUrls.push(url);
    }
  }
  return userUrls;
};

export const deleteUrlById = (id) => {
  for (const [code, url] of urls.entries()) {
    if (url.id === id) {
      urls.delete(code);
      return true;
    }
  }
  return false;
}; 
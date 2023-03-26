export const getMe = () => {
  return fetch('/api/bids/profile');
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const getBids = () => {
  return fetch('/api/bids');
};

export const createBid = (bidData) => {
  console.log(bidData.name);
  const formData = new FormData();
  formData.append('name', bidData.name);
  formData.append('description', bidData.description);
  formData.append('price', bidData.price);
  formData.append('image', bidData.image);
  
  for (let entry of formData.entries()) { //debug
    console.log(entry[0] + ": " + entry[1]);
  }

  return fetch('/api/bids', {
    method: 'POST',
    body: formData,
  });
};

export const removeBid = (bidId) => {
  return fetch(`/api/bids/${bidId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const addToCart = (bidId) => {
  console.log(bidId);
  return fetch('/api/users/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bidId }),
  });
};

export const viewCart = () => {
  return fetch('/api/users/cart');
};

export const removeFromCart = (itemId) => {
  return fetch(`/api/users/cart/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
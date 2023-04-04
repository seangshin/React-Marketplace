export const getMe = (token) => {
  return fetch('/api/items/profile', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
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
  return fetch('/api/items');
};

export const createBid = (bidData, token) => {
  console.log(bidData.name);
  const formData = new FormData();
  formData.append('name', bidData.name);
  formData.append('description', bidData.description);
  formData.append('price', bidData.price);
  formData.append('image', bidData.image);
  
  for (let entry of formData.entries()) { //debug
    console.log(entry[0] + ": " + entry[1]);
  }

  return fetch('/api/items', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export const removeBid = (bidId, token) => {
  return fetch(`/api/items/${bidId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const addToCart = (bidId, token) => {
  console.log(bidId);
  return fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bidId }),
  });
};

export const viewCart = (token) => {
  return fetch('/api/cart', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeFromCart = (itemId, token) => {
  return fetch(`/api/cart/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const checkout = (total, token) => {
  console.log('checkout');
  return fetch('/api/cart/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({total}),
  });
};
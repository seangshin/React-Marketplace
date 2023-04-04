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

export const getItems = () => {
  return fetch('/api/items');
};

export const createItem = (itemData, token) => {
  console.log(itemData.name);
  const formData = new FormData();
  formData.append('name', itemData.name);
  formData.append('description', itemData.description);
  formData.append('price', itemData.price);
  formData.append('image', itemData.image);
  
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

export const removeItem = (itemId, token) => {
  return fetch(`/api/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const addToCart = (itemId, token) => {
  console.log(itemId);
  return fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
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
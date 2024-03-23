export const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data;
}

export async function getOrder(id: any) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder: any) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);

    if (!res.ok) throw Error();
    const { data } = await res.json();
    console.log(data);
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(id: any, updateObj: any) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
export async function getAddress({ latitude, longitude }: any) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();
  return data;
}

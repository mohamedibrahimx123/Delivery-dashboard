export const fetchOrders = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (!res.ok) throw new Error('Failed to fetch');

  const data = await res.json();

  return data.slice(0, 20).map(item => ({
    id: item.id,
    title: item.title,
    description: item.body,
    price: '50$'
  }));
}

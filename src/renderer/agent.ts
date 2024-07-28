import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5300/api';

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

const blockchain = {
  getNodes: () => instance.get('/nodes'),
  getNode: (id: string) => instance.get(`/node/${id}`),
  getNodeGraph: (id: string) => instance.get(`/node/${id}/graph`),
  getChat: (id: string) => instance.get(`/chat/${id}`),
  postChat: (message: string, nodeId: string) =>
    instance.post(`/chat`, { message, node: nodeId }),
  getCrawler: () => instance.get('/crawler'),
};

export default { blockchain };

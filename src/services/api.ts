// API services and external calls
export const api = {
  get: async (url: string) => {
    const response = await fetch(url);
    return response.json();
  }
};

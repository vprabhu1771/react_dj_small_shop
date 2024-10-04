export const apiRequest = async (endpoint, method = 'GET', body = null) => {

    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Include Bearer token
    };
  
    const response = await fetch(endpoint, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
    
    return response.json();
    
};
async function request(pathname) {
  const response = await fetch(pathname);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

async function requestWithMethod(pathname, options) {
  const response = await fetch(pathname, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.detail || payload.error || `Request failed: ${response.status}`);
  }
  return payload;
}

export const apiClient = {
  getMap(pageId) {
    return request(`/api/maps/${pageId}`);
  },
  getMaps() {
    return request('/api/maps');
  },
  getZoneStorage(zone) {
    return request(`/api/storage/zone/${encodeURIComponent(zone)}`);
  },
  getSubAreaStorage(subArea) {
    return request(`/api/storage/sub-area/${encodeURIComponent(subArea)}`);
  },
  getStorageMeta() {
    return request('/api/storage/meta');
  },
  refreshStorageCache() {
    return requestWithMethod('/api/storage/cache/refresh', { method: 'POST' });
  },
  listStorageRecords(params = {}) {
    const searchParams = new URLSearchParams();
    if (params.subArea) searchParams.set('subArea', params.subArea);
    if (params.zone) searchParams.set('zone', params.zone);
    if (params.query) searchParams.set('query', params.query);
    const queryString = searchParams.toString();
    return request(`/api/storage/records${queryString ? `?${queryString}` : ''}`);
  },
  createStorageRecord(payload) {
    return requestWithMethod('/api/storage/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
  updateStorageRecord(id, payload) {
    return requestWithMethod(`/api/storage/records/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
  deleteStorageRecord(id) {
    return requestWithMethod(`/api/storage/records/${id}`, {
      method: 'DELETE',
    });
  },
};

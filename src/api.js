/**
 * API Service for interacting with WordPress REST API.
 */
const getRestConfig = () => {
  const data = window.csmmData || {};
  return {
    restUrl: data.restUrl || '/wp-json/csmm/v1/',
    nonce: data.nonce || '',
    exportUrl: data.exportUrl || '',
    previewUrl: data.previewUrl || '',
    siteUrl: data.siteUrl || '',
    pluginUrl: data.pluginUrl || '',
    version: data.version || '3.2.0',
    user: data.user || { name: 'Admin', can_manage: true },
  };
};

export const api = {
  getConfig: getRestConfig,

  async getSettings() {
    const { restUrl, nonce } = getRestConfig();
    const res = await fetch(`${restUrl}settings`, {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
    if (!res.ok) throw new Error(`Failed to load settings: ${res.statusText}`);
    return res.json();
  },

  async saveSettings(settings) {
    const { restUrl, nonce } = getRestConfig();
    const res = await fetch(`${restUrl}settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      body: JSON.stringify(settings),
    });
    if (!res.ok) throw new Error(`Failed to save settings: ${res.statusText}`);
    return res.json();
  },

  async getSubscribers(page = 1, perPage = 15, search = '') {
    const { restUrl, nonce } = getRestConfig();
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
      search: search || '',
    });
    const res = await fetch(`${restUrl}subscribers?${params.toString()}`, {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
    if (!res.ok) throw new Error(`Failed to load subscribers: ${res.statusText}`);
    return res.json();
  },

  async deleteSubscriber(id) {
    const { restUrl, nonce } = getRestConfig();
    const res = await fetch(`${restUrl}subscribers/${id}`, {
      method: 'DELETE',
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
    if (!res.ok) throw new Error(`Failed to delete subscriber: ${res.statusText}`);
    return res.json();
  },

  async getTemplates() {
    const { restUrl, nonce } = getRestConfig();
    const res = await fetch(`${restUrl}templates`, {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
    if (!res.ok) throw new Error(`Failed to load templates: ${res.statusText}`);
    return res.json();
  },

  async getTargetItems() {
    const { restUrl, nonce } = getRestConfig();
    const res = await fetch(`${restUrl}target-items`, {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
    if (!res.ok) throw new Error(`Failed to load target items: ${res.statusText}`);
    return res.json();
  },
};

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

/**
 * Robust JSON fetch wrapper that handles unexpected HTML prefixes.
 */
const fetchJson = async (url, options = {}) => {
  const res = await fetch(url, options);
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    // Try to extract JSON if server prefixed with PHP warning/notice HTML
    const jsonStart = text.indexOf('{');
    const jsonArrayStart = text.indexOf('[');
    const start = jsonStart !== -1 && jsonArrayStart !== -1 ? Math.min(jsonStart, jsonArrayStart) : Math.max(jsonStart, jsonArrayStart);

    if (start !== -1) {
      try {
        return JSON.parse(text.substring(start));
      } catch (e) {
        // fall through
      }
    }

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    throw new Error('Server returned invalid response format.');
  }
};

export const api = {
  getConfig: getRestConfig,

  async getSettings() {
    const { restUrl, nonce } = getRestConfig();
    return fetchJson(`${restUrl}settings`, {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
  },

  async saveSettings(settings) {
    const { restUrl, nonce } = getRestConfig();
    return fetchJson(`${restUrl}settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      body: JSON.stringify(settings),
    });
  },

  async getSubscribers(page = 1, perPage = 15, search = '') {
    const { restUrl, nonce } = getRestConfig();
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
      search: search || '',
    });
    return fetchJson(`${restUrl}subscribers?${params.toString()}`, {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
  },

  async deleteSubscriber(id) {
    const { restUrl, nonce } = getRestConfig();
    return fetchJson(`${restUrl}subscribers/${id}`, {
      method: 'DELETE',
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
  },

  async getTemplates() {
    const { restUrl, nonce } = getRestConfig();
    return fetchJson(`${restUrl}templates`, {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
  },

  async getTargetItems() {
    const { restUrl, nonce } = getRestConfig();
    return fetchJson(`${restUrl}target-items`, {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
  },
};

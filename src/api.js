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
    version: data.version || '3.2.1',
    user: data.user || { name: 'Admin', can_manage: true },
  };
};

/**
 * Accurately build REST URLs supporting both plain (?rest_route=) and pretty permalinks.
 */
const buildUrl = (endpoint, params = {}) => {
  const { restUrl } = getRestConfig();
  const base = restUrl.endsWith('/') ? restUrl : restUrl + '/';
  let fullUrl = base + endpoint;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  if (queryString) {
    const separator = fullUrl.includes('?') ? '&' : '?';
    fullUrl += separator + queryString;
  }

  return fullUrl;
};

/**
 * Robust JSON fetch wrapper.
 */
const fetchJson = async (url, options = {}) => {
  const res = await fetch(url, {
    credentials: 'same-origin',
    ...options,
  });
  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    // Try to extract JSON if server prefixed with PHP warning/notice HTML
    const jsonStart = text.indexOf('{');
    const jsonArrayStart = text.indexOf('[');
    let start = -1;
    if (jsonStart !== -1 && jsonArrayStart !== -1) {
      start = Math.min(jsonStart, jsonArrayStart);
    } else {
      start = Math.max(jsonStart, jsonArrayStart);
    }

    if (start !== -1) {
      try {
        data = JSON.parse(text.substring(start));
      } catch (e) {
        // fall through
      }
    }
  }

  if (data !== undefined) {
    if (!res.ok && data.message) {
      throw new Error(data.message);
    }
    return data;
  }

  const cleanSnippet = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150);
  throw new Error(`Server returned (${res.status}): ${cleanSnippet || 'Empty response'}`);
};

export const api = {
  getConfig: getRestConfig,

  async getSettings() {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl('settings'), {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
  },

  async saveSettings(settings) {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl('settings'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      body: JSON.stringify(settings),
    });
  },

  async getSubscribers(page = 1, perPage = 15, search = '') {
    const { nonce } = getRestConfig();
    const url = buildUrl('subscribers', {
      page: String(page),
      per_page: String(perPage),
      search: search || '',
    });
    return fetchJson(url, {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
  },

  async deleteSubscriber(id) {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl(`subscribers/${id}`), {
      method: 'DELETE',
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
  },

  async bulkDeleteSubscribers(ids) {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl('subscribers/bulk-delete'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      body: JSON.stringify({ ids }),
    });
  },

  async getTemplates() {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl('templates'), {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
  },

  async getTargetItems() {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl('target-items'), {
      headers: {
        'X-WP-Nonce': nonce,
      },
    });
  },

  async testMailchimp(apiKey, listId) {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl('integrations/test-mailchimp'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      body: JSON.stringify({ api_key: apiKey, list_id: listId }),
    });
  },

  async testBrevo(apiKey, listId) {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl('integrations/test-brevo'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      body: JSON.stringify({ api_key: apiKey, list_id: listId }),
    });
  },

  async testMailerLite(apiKey, groupId) {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl('integrations/test-mailerlite'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      body: JSON.stringify({ api_key: apiKey, group_id: groupId }),
    });
  },

  async testWebhook(url) {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl('integrations/test-webhook'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      body: JSON.stringify({ url }),
    });
  },

  async sendTestEmail(type, recipient, subject, body) {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl('integrations/send-test-email'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      body: JSON.stringify({ type, recipient, subject, body }),
    });
  },

  async broadcastLaunchEmail() {
    const { nonce } = getRestConfig();
    return fetchJson(buildUrl('integrations/broadcast-launch-email'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      body: JSON.stringify({}),
    });
  },
};

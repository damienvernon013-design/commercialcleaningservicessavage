const CRM_ENDPOINT = 'https://thequotemasters.com/crm_api/api.php?action=push_lead';
const INDUSTRY_ID = 23;

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitize(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.commercialcleaningservicessavage.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  const token = process.env.CRM_API_TOKEN;
  if (!token) {
    res.status(500).json({ success: false, error: 'Server misconfiguration' });
    return;
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  const name = sanitize(body.name, 100);
  const phone = sanitize(body.phone, 20);
  const email = sanitize(body.email, 150);

  if (!isNonEmptyString(name) || !isNonEmptyString(phone)) {
    res.status(400).json({ success: false, error: 'Name and phone are required' });
    return;
  }

  if (email && !isValidEmail(email)) {
    res.status(400).json({ success: false, error: 'Invalid email address' });
    return;
  }

  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts.shift() || name;
  const lastName = nameParts.join(' ') || '-';

  const city = sanitize(body.city, 100);
  const company = sanitize(body.company, 150);
  const sqft = sanitize(body.sqft, 50);
  const service = sanitize(body.service, 100);
  const notes = sanitize(body.notes, 2000);
  const utmSource = sanitize(body.utm_source, 255);
  const honeypot = sanitize(body.website, 200);

  if (honeypot) {
    res.status(200).json({ success: true });
    return;
  }

  const noteParts = [];
  if (city) noteParts.push(`City: ${city}`);
  if (sqft) noteParts.push(`Approx sq ft: ${sqft}`);
  if (service) noteParts.push(`Service requested: ${service}`);
  if (notes) noteParts.push(`Notes: ${notes}`);

  const payload = {
    zip: '',
    customer: {
      company_name: company,
      first_name: firstName,
      last_name: lastName,
      position: '',
      phone,
      email,
      email2: '',
      address: city,
      service_address: city,
      notes: noteParts.join(' | ')
    },
    industry: INDUSTRY_ID,
    questions: [],
    appointments: [],
    number_of_quotes: '1',
    utm_source: utmSource
  };

  try {
    const crmResponse = await fetch(CRM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const text = await crmResponse.text();

    if (!crmResponse.ok) {
      res.status(502).json({ success: false, error: 'Upstream CRM error' });
      return;
    }

    res.status(200).json({ success: true, upstream: text });
  } catch (err) {
    res.status(502).json({ success: false, error: 'Failed to reach CRM' });
  }
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  companyName?: unknown;
  projectType?: unknown;
  serviceNeeded?: unknown;
  estimatedArea?: unknown;
  message?: unknown;
  website?: unknown;
};

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: 'Invalid payload. Please submit again.' }, { status: 400 });
  }

  // Honeypot for bot filtering
  if (clean(payload.website)) {
    return Response.json({ message: 'Thank you. Your enquiry has been received.' }, { status: 202 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const companyName = clean(payload.companyName);
  const projectType = clean(payload.projectType) || 'General Inquiry';
  const serviceNeeded = clean(payload.serviceNeeded);
  const estimatedArea = clean(payload.estimatedArea);
  const message = clean(payload.message);

  if (name.length < 2 || name.length > 120) {
    return Response.json({ message: 'Please provide a valid full name.' }, { status: 400 });
  }

  if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)) {
    return Response.json({ message: 'Please provide a valid corporate email address.' }, { status: 400 });
  }

  const referenceCode = `VCE-${Date.now().toString().slice(-6)}`;
  const inquiryRecord = {
    referenceCode,
    name,
    email: email || 'Not provided',
    phone: phone || 'Not provided',
    companyName: companyName || 'Private Client',
    projectType,
    serviceNeeded: serviceNeeded || 'Structural Consulting',
    estimatedArea: estimatedArea || 'N/A',
    message: message || 'Direct assessment requested.',
    receivedAt: new Date().toISOString(),
  };

  // Optional webhook forwarding if configured
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const destination = new URL(webhookUrl);
      if (destination.protocol === 'https:' || destination.hostname === 'localhost') {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (process.env.CONTACT_WEBHOOK_SECRET) {
          headers.Authorization = `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}`;
        }
        await fetch(destination, {
          method: 'POST',
          headers,
          body: JSON.stringify(inquiryRecord),
          signal: AbortSignal.timeout(5_000),
          cache: 'no-store',
        });
      }
    } catch (err) {
      console.warn('Webhook forwarding non-fatal error:', err);
    }
  }

  console.log('[NEW INQUIRY RECEIVED]:', inquiryRecord);

  return Response.json(
    {
      success: true,
      referenceCode,
      message: `Enquiry logged successfully. Reference ID: ${referenceCode}. Our senior structural engineer will reach out within 24 hours.`,
      data: inquiryRecord,
    },
    { status: 201 }
  );
}

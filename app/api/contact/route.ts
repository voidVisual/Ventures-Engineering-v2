type ContactPayload = {
  name?: unknown;
  email?: unknown;
  companyName?: unknown;
  projectType?: unknown;
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
    return Response.json({ message: 'Please submit the form again.' }, { status: 400 });
  }

  // Quietly accept bot submissions without forwarding them.
  if (clean(payload.website)) {
    return Response.json({ message: 'Thank you. Your enquiry has been received.' }, { status: 202 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const companyName = clean(payload.companyName);
  const projectType = clean(payload.projectType);
  const message = clean(payload.message);

  if (name.length < 2 || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || message.length < 10 || message.length > 4000 || companyName.length > 160 || projectType.length > 100) {
    return Response.json({ message: 'Check the form fields and try again.' }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json(
      { message: 'The enquiry form is not connected yet. Please configure the contact webhook and try again.' },
      { status: 503 },
    );
  }

  try {
    const destination = new URL(webhookUrl);
    if (destination.protocol !== 'https:' && destination.hostname !== 'localhost') {
      return Response.json({ message: 'The contact service is not configured securely.' }, { status: 503 });
    }

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (process.env.CONTACT_WEBHOOK_SECRET) {
      headers.Authorization = `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}`;
    }

    const upstream = await fetch(destination, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, email, companyName, projectType, message, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return Response.json({ message: 'We could not deliver your enquiry right now. Please try again shortly.' }, { status: 502 });
    }

    return Response.json({ message: 'Thank you. Your enquiry has been sent to our team.' }, { status: 201 });
  } catch {
    return Response.json({ message: 'We could not deliver your enquiry right now. Please try again shortly.' }, { status: 502 });
  }
}

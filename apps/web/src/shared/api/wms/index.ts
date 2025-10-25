
// noinspection HttpUrlsUsage
const ZULU_URL = process.env.ZULU_URL || "http://zs.zulugis.ru:6473/ws";
const AUTH = Buffer.from(`${process.env.ZULU_LOGIN || 'mo'}:${process.env.ZULU_PASSWORD || 'mo'}`).toString("base64");

export async function fetchWmsData(req: Request) {
  const url = new URL(req.url);
  const search = url.search || "";
  const targetUrl = `${ZULU_URL}${search}`;

  const response = await fetch(targetUrl, {
    headers: {
      Authorization: `Basic ${AUTH}`,
    },
  });

  if (!response.ok) throw new Error(`Failed to fetch WMS: ${response.status}`)

  return response.arrayBuffer();
}

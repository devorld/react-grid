export async function fetchWfsData() {
  const url =
    "https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=topp:states&outputFormat=application/json&srsname=EPSG:4326";

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch WFS data");

  return res.text();
}

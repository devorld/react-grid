import { GmlParser } from "@npm9912/s-gml";

// noinspection HttpUrlsUsage
const ZULU_URL = process.env.ZULU_URL || "http://zs.zulugis.ru:6473/ws";
const AUTH = Buffer.from(`${process.env.ZULU_LOGIN || 'mo'}:${process.env.ZULU_PASSWORD || 'mo'}`).toString("base64");

// noinspection HttpUrlsUsage,HtmlUnknownTarget,XmlUnusedNamespaceDeclaration
const REQUEST_BODY = `
<GetFeature version="1.0.0" service="WFS" outputFormat="GML2"
 xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns="http://www.opengis.net/wfs" xmlns:wfs="http://www.opengis.net/wfs"
   xsi:schemaLocation="http://www.opengis.net/wfs ../wfs/1.0.0/WFS-basic.xsd"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xmlns:piter="http://www.zulugis.ru/piter" xmlns:world="http://www.zulugis.ru/world"
     >
<Query typeName="world:world">
<ogc:PropertyName>FIPS_CNTRY</ogc:PropertyName>
<ogc:PropertyName>CNTRY_NAME</ogc:PropertyName>
</Query></GetFeature>
`;

export async function fetchWfsData(): Promise<string> {
  const response = await fetch(ZULU_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${AUTH}`,
      'Content-Type': 'text/xml',
      "Access-Control-Allow-Origin": "*" // temporary presentation solution, not for production
    },
    body: REQUEST_BODY,
  });

  if (!response.ok) throw new Error(`Failed to fetch WFS: ${response.status}`)

  const parser = new GmlParser();
  const gmlData = await response.text();

  // noinspection ES6MissingAwait
  return parser.parse(gmlData) as Promise<unknown> as Promise<string>;
}

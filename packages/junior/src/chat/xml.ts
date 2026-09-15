/** Escape text for an internal XML element body. */
export function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/** Escape text for a double-quoted internal XML attribute. */
export function escapeXmlAttribute(value: string): string {
  return escapeXml(value).replaceAll('"', "&quot;");
}

/** Recover text escaped for an internal XML prompt boundary. */
export function unescapeXml(value: string): string {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&");
}

// Vercel build step: downloads the demo site (a static export of every page)
// and unpacks it into ./site, which vercel.json serves. Node built-ins only,
// so the build needs no dependencies. The archive is checked against its
// SHA-256 before anything is written.
import { createHash } from "node:crypto";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { gunzipSync } from "node:zlib";

const ARCHIVE_URL =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_3K3qtKP25ChJUBUMvDA7eyYuWNW/4b58f2b5-4bde-4e45-9e03-01c3c246cd0f.gz";
const ARCHIVE_SHA256 = "00f22453bf480fb5d6e1110b2093680bbec7aa61937119cb30d02b2093489f1d";
const OUT = resolve("site");

const response = await fetch(ARCHIVE_URL);
if (!response.ok) throw new Error(`Download failed: HTTP ${response.status}`);
const archive = Buffer.from(await response.arrayBuffer());
const sum = createHash("sha256").update(archive).digest("hex");
if (sum !== ARCHIVE_SHA256) throw new Error(`Checksum mismatch: ${sum}`);

// The archive is a plain ustar tarball of site/: directories and files only.
const tar = gunzipSync(archive);
const field = (header, start, length) =>
  header.toString("utf8", start, start + length).replace(/\0[\s\S]*$/, "");

rmSync(OUT, { recursive: true, force: true });
let files = 0;
for (let offset = 0; offset + 512 <= tar.length; ) {
  const header = tar.subarray(offset, offset + 512);
  if (header.every((byte) => byte === 0)) break;
  const name = [field(header, 345, 155), field(header, 0, 100)].filter(Boolean).join("/");
  const size = parseInt(field(header, 124, 12).trim() || "0", 8);
  const type = field(header, 156, 1) || "0";
  const body = tar.subarray(offset + 512, offset + 512 + size);
  offset += 512 + Math.ceil(size / 512) * 512;

  const target = resolve(name);
  if (target !== OUT && !target.startsWith(OUT + sep)) throw new Error(`Unexpected path in archive: ${name}`);
  if (type === "5") {
    mkdirSync(target, { recursive: true });
  } else if (type === "0") {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, body);
    files += 1;
  } else {
    throw new Error(`Unsupported archive entry ${name} (type ${type})`);
  }
}
if (!files) throw new Error("The archive is empty");
console.log(`Villa Mamma demo: ${files} files in site/`);

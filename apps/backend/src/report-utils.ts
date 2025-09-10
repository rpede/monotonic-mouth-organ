import { Case } from "@prisma/client";
import { execSync } from "child_process";
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import path from "path";

const dir = 'user-data/';

export function reportPath(companyName: string, caseNo: string) {
  return path.join(dir, companyName, caseNo + ".html");
}

export function reportDirectory(companyName: string) {
  return path.join(dir, companyName);
}

export function withCharacterCount(c: Case & { company: { name: string } }) {
  const fp = reportPath(c.company.name, c.caseNo);
  // Remove HTML tags and count chars.
  const output = execSync(`cat "${fp}" | sed 's/<[^>]*>//g' | wc -m`).toString();
  // Log for debugging, should be removed...
  console.log(output);
  const length = Number.parseInt(output);
  return { ...c, length }
}

export async function readReport(companyName: string, filename: string) {
  return await fsp.readFile(path.join(dir, companyName, filename));
}

export async function saveReport(companyName: string, filename: string, content: string) {
  const comDir = reportDirectory(companyName);
  if (!fs.existsSync(comDir)) await fsp.mkdir(comDir);
  fsp.writeFile(path.join(comDir, filename), content);
}

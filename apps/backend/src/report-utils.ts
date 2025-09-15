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
  const length = Number.parseInt(getReportLength(c.company.name, c.caseNo));
  return { ...c, length }
}

export function getReportLength(companyName: string, caseNo: string) {
  const fp = reportPath(companyName, caseNo);
  // Remove HTML tags and count chars.
  const output = execSync(`cat "${fp}" | sed 's/<[^>]*>//g' | wc -m`).toString();
  // Log for debugging, should be removed...
  return output;
}

export async function readReport(filename: string) {
  return await fsp.readFile(path.join(dir, filename));
}

export async function saveReport(companyName: string, filename: string, content: string) {
  const comDir = reportDirectory(companyName);
  if (!fs.existsSync(comDir)) await fsp.mkdir(comDir);
  fsp.writeFile(path.join(comDir, filename), content);
}

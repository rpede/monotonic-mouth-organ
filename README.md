# Monotonic Mouth Organ

![Logo](./logo-small.png)

## Introduction

This is how NOT to build whistleblower software.
It is intended as a teaching tool only!

This project is intentionally broken in as many horrible ways as I can think of.
It is intended only to be used en exercise in pentesting.

> [!CAUTION]
> Only run in a safe environment, as it will expose the entire filesystem over
> HTTP and is vulnerable to remote code execution.

## Vulnerabilities

It contains (at least) vulnerabilities of the following categories.

- Broken access control
  - IDOR
  - Path traversal
  - Privilege escalation
- Cryptographic failure
- Injection
  - SQLi
  - XSS
  - OS command injection
- Insecure design
- Security misconfiguration
- Vulnerable and Outdated Components

Can you find them all?

How many user credentials can you uncover?

## Backstory

This is a (fake) whistleblower solution where employees can (un)safely report
company policy violations, misconduct, fraud, harassment or other concerns.

The solution designed with maximum (in)security in mind.
Rest assured that any employee's identity will remain ~anonymous~, ensuring that
investigators can ~not~ discover who submitted report.

When submitting, please make sure to remember the case number you receive.
Our support team cannot (unless absolutely necessary) recover it for you.

Also, please don't bother the admin with trivialities (because the admin panel
is still work-in-progress), as she is very busy (on vacation) at the moment.

Thanks for choosing Monotonic Mouth Organ, the software that blows.

## Getting started

```sh
docker compose up
```

Open <http://localhost:4200/>.

Happy hacking!

## Walk-through

There is a walk-through ([here](/walkthrough.md)) that you can follow if you
don't know how to proceed.
However, probably more fun if you can find vulnerabilities on your own.

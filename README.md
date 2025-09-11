# Monotonic Mouth Organ

![Logo](./logo-small.png)

## Introduction

This is how NOT to build whistle-blower software.
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

This is a (fake) whistle-blower solution where employees can (un)safely report
company policy violations, misconduct, fraud, harassment or other concerns.

The solution aims for maximum (in)security.
We therefore assure any employees identity is kept ~anonymously~, such that
investigators can ~not~ tell the identity of whoever filed a report.

To all employees, please remember the case number you get after filing a
report, because our support can not (unless they absolutely have to) recover it
for you.

Also, please don't bother the admin with trivialities (because admin panel is
still work-in-progress), as she is very busy (on vacation) at the moment.

## Getting started

```sh
docker compose up
```

Open <http://localhost:4200/>.

Happy hacking!

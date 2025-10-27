---
title: Analyze Recurrences
date: 2025-10-27
weight: 3
description: Introduction of recurrence analyze methods.
---

## The Iteration Method

Steps:

1. Expand the recurrence a few times.
2. Write the expanded form as a summation.
3. Simplify the summation.
4. Substitute the **base condition** to get the result.

### Example 1

Given that:

$$
T(n) = c + T(n/2)
$$

Firstly, expand it.

$$
\begin{align*}
T(n) &= c + T(n/2) \\
     &= c + c + T(n/4) \\
     &= c + c + c + T(n/8) \\
     &= \dots \\
     &= kc + T(n/2^k)
\end{align*}
$$

Then, assume that:

$$
n = 2^k \Longrightarrow k = \log{n}
$$

Finally, substitute it to the original expression:

$$
\begin{align*}
T(n) &= kc + T(n/2^k) \\
     &= c\log{n} + T(n/2^{\log{n}}) \\
     &= c\log{n} + T(1) \\
     &= O(\log{n})
\end{align*}
$$

### Example 2

Given that:

$$
T(n) =
\begin{cases}
  1 &n=1 \\
  T(n-1) + \log{n} &n>1
\end{cases}
$$

Then

$$
\begin{align*}
T(n) &= T(n-1) + \log{n} \\
     &= T(n-2) + \log{n} + \log{n-1} \\
     &= \dots \\
     &= T(n-k) + \sum_{i=1}^{n}{\log{i}} \\
     &= T(n-k) + \log{(n!)} \\
\end{align*}
$$

Since when $n=1$, $T(n) = 1$, so we assume that $k = n - 1$ finally.

Then

$$
T(n) = T(1) + \log{(n!)} = 1 + \log{(n!)}
$$

Use Stirling's formula,

$$
\begin{align*}
\log{n} &= n\log{n} - n\log{e} + O(\log{n}) \\
T(n) &= 1 + \log{(n!)} \\
T(n) &= 1 + n\log{n} - n\log{e} + O(\log{n}) \\
T(n) &= O(n\log{n})
\end{align*}
$$

## The Substitution/Induction Method

Steps:

1. Guess the result form.
2. Prove by induction.

### Example

Given that

$$
T(n) = 2T(\frac{n}{2}) + n
$$

Firstly, we guess that $T(n) \in O(n\log{n})$

So we need to prove that $T(n) \le c \cdot n\log{n}$

Assume that

$$
T(\frac{n}{2}) \le c \cdot \frac{n}{2}\log{\frac{n}{2}}
$$

Then the inductive steps are:

$$
\begin{align*}
T(n) &= 2T(\frac{n}{2}) + n \\
     &\le 2(c \cdot \frac{n}{2}\log{\frac{n}{2}}) + n \\
     &= cn\log{\frac{n}{2}} + n \\
     &= cn(\log{n} - 1) + n \\
     &= cn\log{n} - (c - 1)n \\
     &\le cn\log{n} \quad \forall c \ge 1 \\
\therefore T(n) &\in O(n\log{n})
\end{align*}
$$

## Recursion Tree Method

Draw the recursion tree and calculate the cost of each level which start at $0$.

## Master Method

Suppose that we have:

$$
T(n) = aT(\frac{n}{b}) + f(n) \quad a \ge 1, b \gt 1
$$

- $n$ is the size of the current problem.
- $a$ is the number of sub problems of the recursion.
- $\frac{n}{b}$ is the size of each sub problem.
- $f(n)$ is the cost of each level recursion.

Then we have three theorems:

1. If $f(n) = O(n^{\log_b{a} - \epsilon})$, then $T(n) = \Theta(n^{\log_b{a}})$
2. If $f(n) = \Theta(n^{\log_b{a}})$, then $T(n) = \Theta(n^{\log_b{a}}\log{n})$
3. If $f(n) = \Omega(n^{\log_b{a} + \epsilon})$, and if $af(\frac{n}{b}) \le cf(n)$ for some $c \lt 1$, and all sufficiently large $n$, then $T(n)=\Theta(f(n))$.

### Example 1

Given that

$$
T(n) = 2T(\frac{n}{2}) + n
$$

Then

$$
\begin{align*}
  a = 2, b &= 2, f(n) = n \\
  n^{\log_b{a}} &= n \\
  n^{\log_b{a}} &= f(n) \\
  \therefore T(n) &= \Theta(n^{\log_b{a}}\log{n}) \\
  &= \Theta(n\log(n))
\end{align*}
$$

### Example 2

Given that

$$
T(n) = 9T(\frac{n}{3}) + n
$$

Then

$$
\begin{align*}
  a = 9, b &=3, f(n) = n \\
  n^{\log_b{a}} &= n^2 \\
  n^{\log_b{a}} &\ge f(n) = n \\
  \therefore f(n) &= O(n^{\log_b{a} - \epsilon}) \\
  &= O(n^{2 - \epsilon}) \\
  \therefore T(n) &= \Theta(n^2)
\end{align*}
$$

### Example 3

Given that

$$
T(n) = 3T(\frac{n}{4}) + n\log{n}
$$

Then

$$
\begin{align*}
  a = 3, b &= 4, f(n) = n\log{n} \\
  n^{log_b{a}} &= n^{log_4{3}} \lt n \lt f(n) \\
\end{align*}
$$

Before applying case 3, we need to check the **regularity condition**, which means that $af(\frac{n}{b}) \le cf(n)$ where $c \lt 1$ should be true.

$$
\begin{align*}
  af(\frac{n}{b}) &= 3f(\frac{n}{4}) \\
  &= \frac{3}{4}n\log{\frac{n}{4}} \\
  cf(n) &= cn\log{n} \\
  \therefore \frac{3}{4}n\log{\frac{n}{4}} &\le cn\log{n} \\
\end{align*}
$$

When $c = \frac{3}{4}$, the expression is true. So the condition check is successfully.

$$
\begin{align*}
  f(n) &= \Omega(n^{\log_b{a} + \epsilon}) = \Omega(n^{\log_{4}{3} + \epsilon}) \\
  \therefore T(n) &= \Theta(f(n)) \\
  &= \Theta(n\log{n})
\end{align*}
$$

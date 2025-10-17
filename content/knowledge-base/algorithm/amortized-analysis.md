---
title: Amortized Analysis
date: 2025-10-17
description: Amortized analysis of algorithms.
weight: 2
---

## Definition

Amortized analysis is a method for analyzing the average cost per operation in a sequence by focusing on worst-case scenarios to determine average running time per operation.

The core idea is that costly operations can be offset by subsequent operations to reduce their impact over time.

It is useful when operations are not uniformly distributed in terms of their costs like dynamic arrays.

## Differences with Other Analyzes

- **Average-case** analysis averages over all possible inputs.
- **Probabilistic** analysis averages over all possible random choices.
- **Amortized analysis** averages over a sequence of operations.

Amortized analysis typically assumes worst-case inputs and disallow for random choices.

Amortized analysis shows that across a sequence of operations, the average per operation stays small, even though some individual operations are expensive.

## Methods of Amortized Analysis

### Aggregate Method

If the upper bound on the total cost of a sequence of $n$ operations is $T(n)$, then the average cost per operation is:

$$
\frac{T(n)}{n}
$$

### Accounting Method

Let $c_i$ be the actual cost of the $i\text{th}$ operation, and $c^{\prime}_i$ be amortized charge of the $i\text{th}$ operation, then we require:

$$
\forall n \quad \sum^n_{i = 1}{c_i} \le \sum^n_{i = 1}{c^{\prime}_i}
$$

It shows that total amortized cost $\ge$ total actual cost.

So amortized cost provides an upper bound on the true cost.

### The Potential Method

Let:

- $D_i$ be data structure after the $i^{\text{th}}$ operation.
- $\Phi(D_i)$ be the potential of $D_i$.
- $c_i$ be the actual cost of the $i^{\text{th}}$ operation.

Then the amortized cost is actual cost + potential change.

$$
\hat{c_i} = c_i + \Phi(D_i) - \Phi(D_{i - 1})
$$

And the total amortized cost for $n$ operations is:

$$
\sum^n_{i = 1}{\hat{c_i}} = \sum^n_{i = 1}{c_i} + \Phi(D_n) - \Phi(D_0)
$$

If $\forall i \quad \Phi(D_0) = 0$ and $\Phi(D_i) \ge 0$, then:

$$
\sum^n_{i = 1}{c_i} \le \sum^n_{i = 1}{\hat{c_i}}
$$

The key points are:

- If potential increases — we are overcharging (extra stored for future).
- If potential decreases — we are undercharging (use stored potential).
- Potential method ensures costs are "smoothed out" over operations.

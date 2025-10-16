---
title: Analyze Algorithms
date: 2025-10-16
description: Introduce how to analyze algorithms.
weight: 1
---

## Efficiency of Algorithms

- **Time Efficiency:** How fast an algorithm runs (Time complexity).
- **Space Efficiency:** How much extra memory it uses (Space complexity).

Today, time efficiency is more important than space efficiency.

### Measuring Running Time

**Running Time** can be measured in seconds or milliseconds, which is depended on specific scenes.

### Measuring Space Efficiency

Major space components are

- **Instruction Space:** Memory for program code.
- **Data Space:** Memory for variables and constants.
- **Run-time Stack Space:** Memory for function calls and recursion.

## Approaches to Time Complexity Analysis

1. Estimation of Running Time:
   - Identify and count frequently executed operations.
   - Count total steps or lines executed.
2. Asymptotic Categorization:
   - Describe algorithm performance in general terms.
   - Ignores maachine-dependent details.

Example:

```cpp
for (int i = 0; i < arr.size(); i++) {
  if (arr[i] == key) {
    return i;
  }
}
return -1;
```

- Count (RAM): One comparison per iteration: $T(n) = n$.
- Asymptotic: $T(n) \in \Theta(n)$

## Random-Access Machine (RAM)

- Infinite memory (one item per call).
- Unit-time memory access.
- Sequential instruction execution.
- Basic operations (load/store, arithmetic, logic) are in unit time.

Then, the running time is measured by number of RAM instructions executed.

### Approaches of Analysis

- **Operation Counts:** Focus on frequently executed operations.
- **Step Counts:** Count total steps or lines of code.

### Limitation of the RAM Model

- Memory is finite though often assumed infinite in programming.
- Memory access times vary (cache, main memory, disk).
- Arithmetic operations differ in cost (e.g., multiplication is more expensive).

In conclusion, the RAM model is useful for analysis but oversimplifies reality.

## Asymptotic Notation

**Asymptotic analysis** evaluates an algorithm’s efficiency as input size grows, focusing on order of growth rather than exact times.

It ignores maachine-dependent constants and focuses on growth trends to compare algorithms fairly.

### Three Cases of Analysis

- **Worst Case:** Maximum running time, provides an upper bound, which is usually the main focus.
- **Average Case:** Expected running time, sometimes is closed to worst case.
- **Best Case:** Minimum running time, rarely considered.

### Notations

| Notation       | Bound       | Meaning                               |
| -------------- | ----------- | ------------------------------------- |
| $O(T(n))$      | Upper Bound | Describe the worst-case complexity.   |
| $\Omega(T(n))$ | Lower Bound | Describe the best-case complexity.    |
| $\Theta(T(n))$ | Tight Bound | Describe both upper and lower bounds. |

Examples:

- $O(n^2)$ means the running time will not exceed $cn^2$ for large $n$.
- $\Omega(n)$ means the algorithm takes at least $cn$ steps.
- $\Theta(n \log{n} )$ means the running time grows proportionally to $n \log{n}$

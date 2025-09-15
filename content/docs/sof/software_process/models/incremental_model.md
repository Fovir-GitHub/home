---
title: Incremental Model
date: 2025-06-08
description: Introduction of incremental model.
weight: 2
---

## Incremental Model

- Incremental development is based on the idea of developing an initial implementation, exposing this to user comment and evolving it through several versions until an adequate system has been developed.
- It is an agile process.

```mermaid
graph LR
  od[Outline Description]

  subgraph ca[Concurrent Activities]
    direction TB

    s[Sepcification]
    d[Development]
    v[Validation]

    s<-->d<-->v
  end

  subgraph Version
    direction TB

    iv[Initial Version]
    ivs[Intermediate Versions]
    fv[Final Version]
  end

  od-->ca

  s<-->iv
  d<-->ivs
  v-->fv
```

### Benefits of Incremental Process

1. Reduce the cost of accommodating changing customer requirements.
2. It is easier to get customer feedback.
3. More rapid delivery and deployment of useful software.

### Problems

- From a management perspective
  1. The process is not visible.
  2. System structure tends to degrade as new increments are added.

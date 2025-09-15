---
title: Types of Requirement
date: 2025-06-08
description: Introduce the types of requirement.
weight: 2
---

## Business Requirements

- Outline measurable goals for the business.
- Define the `why` behind a software project.
- Match project goals to stakeholder goals.
- Maintain a BRD with requirements, updates or changes.

## User Requirements

- Reflect specific user needs or expectations.
- Describe the `who` of a software project.
- Highlight how users interact with it.
- Create a URS, or make them part of the BRD.

## Software Requirements

- Identify features, functions, non-functional requirements and use cases.
- Delve into the `how` of a software project.
- Describe software as functional modules and non-functional attributes.
- Compose an SRS, and optionally, an FRS.

![Type of Requirements](../../img/type_of_requirements.png)

## Types of Readers

```mermaid
graph LR
  rd[Requirements Definition]-->rdt[Client Managers <br> System End-users <br> Client Engineers <br> Constractor Managers <br> System Architects]

  rs[Requirements Specification]-->rst[System End-users <br> Client Engineers <br> System Architects <br> Software Developers]

  ss[Software Specification]-->sst[Client Engineers <br> System Architects <br> Software Developers]
```

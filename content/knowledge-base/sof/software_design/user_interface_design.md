---
title: User Interface Design
date: 2025-06-09
weight: 7
description: Introduce the user interface.
---

## Typical Design Errors

- Lack of consistency
- Too much memorization
- No guidance / help
- No context sensitivity
- Poor response
- Arcane / unfriendly

## Golden Rules

### Place the User in Control

- Define interaction modes in a way that does not force a user into unnecessary or undesired actions.
- Provide for flexible interaction.
- Allow user interaction to be interruptible and undoable.
- Streamline interaction as skill levels advance and allow the interaction to be customized.
- Hide technical internals from the casual user.
- Design for direct interaction with objects that appear on the screen.

### Reduce the User's Memory Load

- Reduce demand on short-term memory.
- Establish meaningful defaults.
- Define shortcuts that are intuitive.
- The visual layout of the interface should be based on a real world metaphor.
- Disclose information in a progressive fashion.

### Make the Interface Consistent

- Allow the user to put the current task into a meaningful context.
- Maintain consistency across a family of applications.
- If past interactive models have created user expectations, do not make changes unless there is a compelling reason to do so.

## User Interface Design Models

- **User model:** a profile of all end users of the system.
- **Design model:** a design realization of the user model.
- **Mental model (system perception):** the user's mental image of what the interface is.
- **Implementation model:** the interface "look and feel" coupled with supporting information that describe interface syntax and semantics.

## Task Analysis and Modeling

This part answers the following questions:

- What work will the user perform in specific circumstances?
- What tasks and subtasks will be performed as the user does the work?
- What specific problem domain objects will the user manipulate as work is performed?
- What is the sequence of work tasks—the workflow?
- What is the hierarchy of tasks?

And

- **Use-cases** define basic interaction.
- **Task elaboration** refines interactive tasks.
- **Object elaboration** identifies interface objects (classes).
- **Workflow analysis** defines how a work process is completed when several people (and roles) are involved.

## Analysis of Display Content

This part answers the following questions:

- Are different types of data assigned to consistent geographic locations on the screen (e.g., photos always appear in the
- upper right-hand corner).
- Can the user customize the screen location for content?
- Is proper on-screen identification assigned to all content?
- If a large report is to be presented, how should it be partitioned for ease of understanding?
- Will mechanisms be available for moving directly to summary information for large collections of data.
- Will graphical output be scaled to fit within the bounds of the display device that is used?
- How will color to be used to enhance understanding?
- How will error messages and warning be presented to the user?

## Interface Design Steps

- Using information developed during interface analysis define interface objects and actions (operations).
- Define events (user actions) that will cause the state of the user interface to change and model this behavior.
- Depict each interface state as it will actually look to the end-user.
- Indicate how the user interprets the state of the system from information provided through the interface.

## Design Issues

- Response time
- Help facilities
- Error handling
- Menu and command labeling
- Application accessibility
- Internationalization.

## Interface Design Principles

- **Anticipation:** A Web App should be designed so that it anticipates the user's next move.
- **Communication:** The interface should communicate the status of any activity initiated by the user.
- **Consistency:** The use of navigation controls, menus, icons, and aesthetics (color, shape, layout, etc.).
- **Controlled autonomy:** The interface should facilitate user movement throughout the Web App, but it should do so in a manner that enforces navigation conventions that have been established for the application.
- **Efficiency:** The design of the Web App and its interface should optimize the user's work efficiency.
- **Focus:** The interface and its content should stay focused on the user tasks at hand.
- **Fitts's Law:** "The time to acquire a target is a function of the distance to and size of the target."
- **Human interface objects:** A vast library of reusable human interface objects has been developed for Web App.
- **Latency reduction:** The Web App should use multitasking in a way that lets the user proceed with work as if the operation has been completed.
- **Learn ability:** A Web App interface should be designed to minimize learning time, and once learned, to minimize relearning requirement.
- **Maintain work product integrity:** A work product must be automatically saved so that it will not be lost if an error occurs.
- **Readability:** All information presented through the interface should be readable by young and old.
- **Track state:** When appropriate, the state of the user interaction should be tracked and stored so that a user can log off and return later to pick up where he/she left off.
- **Visible navigation:** A well-designed Web App interface provides the illusion that users are in the same place, with the work brought to them.

## Aesthetic Design

- Don’t be afraid of white space.
- Emphasize content.
- Organize layout elements from top-left to bottom right.
- Group navigation, content, and function geographically within the page.
- Don’t extend your real estate with the scrolling bar.
- Consider resolution and browser window size when designing layout

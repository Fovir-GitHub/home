---
date: 2025-06-06
title: Slice
description: Document some details of slice in go language.
---

## Reference of Array

When we create a slice with an existing array, the slice is a reference of the array in fact, which means when we change an element of the slice, the corresponding element in the array will be changed as well.

The following code shows how it works.

```go
package main

import (
	"fmt"
)

func main() {
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}

	fmt.Println(names)

	a := names[0:2]
	b := names[1:3]
	fmt.Println(a, b)

	b[0] = "XXX"
	fmt.Println(a, b)
	fmt.Println(names)
}

```

The output will be:

```text
[John Paul George Ringo]
[John Paul] [Paul George]
[John XXX] [XXX George]
[John XXX George Ringo]
```

As what is showed above, when the slice element `b[0]` was changed, the corresponding element, which is `names[1]`, was changed as well.

So a slice is a **reference** of an array.

## Capacity of Slice

### Mechanism of Expansion

The capacity of a slice represents the maximum number of elements it can store.

`Go` provides a built-in function `cap()` to get the capacity of a slice.

In addition, the capacity can be enlarged by using the `append()` function. And what we focus on in the section is the mechanism and the law of expanding capacity. The following code shows how it works.

```go
package main

import (
	"fmt"
)

func main() {
	var s []int

	for i := range 10 {
		s = append(s, i)
		ShowSlice(s)
	}
}

func ShowSlice(s []int) {
	fmt.Printf("cap = %d len = %d %v\n", cap(s), len(s), s)
}
```

This program appends `i` to the slice `s` each time, which can enlarge the capacity of the slice. And the output is as follows.

```text
cap = 1 len = 1 [0]
cap = 2 len = 2 [0 1]
cap = 4 len = 3 [0 1 2]
cap = 4 len = 4 [0 1 2 3]
cap = 8 len = 5 [0 1 2 3 4]
cap = 8 len = 6 [0 1 2 3 4 5]
cap = 8 len = 7 [0 1 2 3 4 5 6]
cap = 8 len = 8 [0 1 2 3 4 5 6 7]
cap = 16 len = 9 [0 1 2 3 4 5 6 7 8]
cap = 16 len = 10 [0 1 2 3 4 5 6 7 8 9]
```

As it showed above, the slice can expand its capacity when it is full, which is `cap(s) == len(s)`.

And the capacity is always doubled **when the capacity is not large**, which ensures the performance of the code since it avoid frequently expanding the capacity.

### Let `cap == len`

Since the capacity of a slice is usually doubled when it is expanded, there is also a way to ensure `cap == len`.

This method uses `make()` function to allocate a fixed capacity for a slice and calls `copy()` function to copy the source slice to another new one. The code is as follows:

```go
package main

import (
	"fmt"
)

func main() {
	var s []int

	for i := range 10 {
		s = MyAppend(s, i)
		ShowSlice(s)
	}
}

func ShowSlice(s []int) {
	fmt.Printf("cap = %d len = %d %v\n", cap(s), len(s), s)
}

func MyAppend(s []int, new_element int) []int {
	s = append(s, new_element)
	newSlice := make([]int, len(s), len(s))

	copy(newSlice, s)

	return newSlice
}
```

In the function `MyAppend()`, the slice `s` is a formal parameter, and editing it will not affect the actual one. The output is:

```text
cap = 1 len = 1 [0]
cap = 2 len = 2 [0 1]
cap = 3 len = 3 [0 1 2]
cap = 4 len = 4 [0 1 2 3]
cap = 5 len = 5 [0 1 2 3 4]
cap = 6 len = 6 [0 1 2 3 4 5]
cap = 7 len = 7 [0 1 2 3 4 5 6]
cap = 8 len = 8 [0 1 2 3 4 5 6 7]
cap = 9 len = 9 [0 1 2 3 4 5 6 7 8]
cap = 10 len = 10 [0 1 2 3 4 5 6 7 8 9]
```

> Reference:
>
> [Go Tour](https://go.dev/tour/moretypes/8)
>
> [ChatGPT](https://chatgpt.com)

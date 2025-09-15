---
date: 2025-07-30
title: Pointer Indirection
icon: charm:binary
description: Document the concept of pointer indirection in Go programming language.
---

## Introduction

Indirection in Go means accessing values through a pointer rather than directly, enabling functions to use variables as `references` instead of copies of value. It is quite similar to the concept of reference in `C++`.

## In Functions

Functions with pointer indirection can be declared as:

```go
func ScaleFunc(v *Vertex, f float64) {
  v.X *= f
  v.Y *= f
}
```

And the function call is:

```go
v := Vertex{3, 4}
ScaleFunc(&v, 10)
// Or
p := &Vertex{4, 3}
ScaleFunc(p, 8)
```

It looks like `C/C++`, where `&` is used to gain the address of variables, and `*` is used to get the value from an address.

## In Methods

Since `Go` is not a traditionally object-oriented language. It does allow programmers to create methods for a structure. And the form of calling a method is similar to `C++`, which uses `.` to access the method function or member function.

However, there is no `this` concept in method functions, meaning that calling method functions copies values.

For example, here is a structure named `Vertex`.

```go
type Vertex struct {
	X, Y float64
}
```

And to declare a function as its method, it can be written as:

```go
func (v Vertex) Show() {
  fmt.Println(v.X, v.Y)
}
```

Then the function can be used as `v.Show()`.

However, if we want to change the value inside the structure, like scaling the vertex, this approach will not work.

```go
func (v Vertex) FakeScale(f float64) {
	v.X *= f
	v.Y *= f
}

func main() {
	SCALE_FACTOR := 10

	v := Vertex{3, 4}

	v.FakeScale(float64(SCALE_FACTOR))
	v.Show()
}
```

The output of above code is `3 4`, so the scale operation is failed. It demonstrates that this method function use `v` as a copy of value, rather than itself or a reference.

To achieve the goal, the following code will work.

```go
func (v *Vertex) Scale(f float64) {
	v.X *= f
	v.Y *= f
}
```

It uses `v` as a reference so that the function can modify its values.

```go
func (v *Vertex) Scale(f float64) {
	v.X *= f
	v.Y *= f
}

func main() {
	SCALE_FACTOR := 10

	v := Vertex{3, 4}

	v.Scale(float64(SCALE_FACTOR))
	v.Show()
}
```

The code above will output `30 40` as expectation.

In addition, if there is a pointer of `Vertex`, then it can also call this function.

```go
func (v *Vertex) Scale(f float64) {
	v.X *= f
	v.Y *= f
}

func main() {
	SCALE_FACTOR := 10

	v := &Vertex{3, 4}

	v.Scale(float64(SCALE_FACTOR))
	v.Show()
}
```

Since `Scale()` function has a pointer receiver, it allows a pointer variable (`v` in the above code) to call itself.

In fact, in the previous example, `Go` interprets `v.Scale()` as `(&v).Scale()`, so it can use the method function with pointer receiver.

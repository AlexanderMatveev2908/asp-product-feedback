# ✅ 1. **Array** (`T[]`)

### ✔ Primitive, built-in, fixed-size

### ✔ Fast

### ✔ Not part of Java Collections Framework

### ❌ Size cannot change

### ❌ No add/remove

### ✔ Looks like:

```java
int[] nums = new int[5];
String[] names = {"peter", "lois", "stewie"};
```

Peter Griffin explanation:

> “Hehehe… arrays are like my pants.
> The size is **fixed**, and once they don’t fit — too bad.”

---

# ✅ 2. **List** (interface)

This is the **interface**, not an implementation.

```java
List<String> list;
```

You can’t do:

```java
new List<>();
```

Because List is just a **contract**.

Peter Griffin explanation:

> “List is like Lois’ rules:
> ‘You gotta follow these methods or you’re sleeping on the couch.’”

---

# ✅ 3. **ArrayList** (implementation of List)

This is the most common List implementation.

### ✔ Resizable

### ✔ Backed by a dynamic array

### ✔ Fast random access

### ✔ You normally declare as List, instantiate as ArrayList:

```java
List<String> list = new ArrayList<>();
```

Peter Griffin explanation:

> “ArrayList is like an elastic waistband — it grows as you stuff more junk inside it.”

---

# 🧨 4. **Arrays.asList(...)**

This is NOT the same as ArrayList.

### ❌ Fixed-size

### ❌ Backed by the original array

### ❌ Cannot add/remove

### ✔ Good for quick conversion

```java
List<String> list = Arrays.asList("meg", "chris");
```

Try to add → BOOM 💥 Exception.

Peter Griffin explanation:

> “It LOOKS like an ArrayList, but try to add something and you get slapped harder than when I forget Lois’s anniversary.”

---

# 🏆 Summary Table (buddy-style)

| Type              | Mutable?                   | Resizable?       | What it actually is  |
| ----------------- | -------------------------- | ---------------- | -------------------- |
| `T[]` Array       | ❌ size fixed              | ❌               | Raw Java array       |
| `List<T>`         | —                          | —                | Interface only       |
| `ArrayList<T>`    | ✔                          | ✔                | Real dynamic list    |
| `Arrays.asList()` | ✔ modify existing elements | ❌ no add/remove | Wrapper around array |

---

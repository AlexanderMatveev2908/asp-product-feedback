# 🧠 Java Functional Interfaces — Mini Cheatsheet

## 🔥 The 4 Fundamental Function Shapes

```markdown
| Name     | Java Interface | Takes Args? | Returns Value? | Example Lambda             |
| -------- | -------------- | ----------- | -------------- | -------------------------- |
| Function | Function<T, R> | ✔️ Yes      | ✔️ Yes         | x -> x + 1                 |
| Consumer | Consumer<T>    | ✔️ Yes      | ❌ No          | x -> System.out.println(x) |
| Supplier | Supplier<R>    | ❌ No       | ✔️ Yes         | () -> Math.random()        |
| Runnable | Runnable       | ❌ No       | ❌ No          | () -> doStuff()            |
```

---

## 🧩 Code Templates

### ✔ Function (arg → return)

```java
Function<T, R> f = t -> { return something; };
```

### ✔ Consumer (arg → nothing)

```java
Consumer<T> c = t -> System.out.println(t);
```

### ✔ Supplier (nothing → return)

```java
Supplier<R> s = () -> computeValue();
```

### ✔ Runnable (nothing → nothing)

```java
Runnable r = () -> doSomething();
```

---

## 🧠 Quick Memory Trick

Think of them like Peter Griffin’s daily routine:

- **Function**: _“Lois, I take something and I give something back… like taking Chris’s fries and giving him trauma.”_ 😆
- **Consumer**: _“I take it… and I keep it.”_ 🍔
- **Supplier**: _“I give something… but don’t ask me where it came from.”_ 😳
- **Runnable**: _“I do stuff… but don’t expect results.”_ 😅

---

## 🌈 Bonus: Bi-Versions (Two Arguments)

```markdown
| Name       | Java Interface    | Args | Returns |
| ---------- | ----------------- | ---- | ------- |
| BiFunction | BiFunction<A,B,R> | 2    | ✔️      |
| BiConsumer | BiConsumer<A,B>   | 2    | ❌      |
```

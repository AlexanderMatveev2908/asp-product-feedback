# 📘 **Java Number Types — Ultimate Cheat Sheet**

# 🧱 **Primitive Integer Types**

## 🔹 `byte` (8-bit)

- **Range:** −128 to 127
- **Size:** 1 byte
- **Use cases:**

  - raw binary data
  - network packets
  - file I/O buffers

- **Avoid for math**, too small

```java
byte b = 120;
```

---

## 🔹 `short` (16-bit)

- **Range:** −32,768 to 32,767
- **Size:** 2 bytes
- **Use cases:**

  - legacy code
  - memory-optimized embedded systems

- **Almost never use today**

```java
short s = 30000;
```

---

## 🔹 `int` (32-bit) ⭐ Default integer

- **Range:** −2,147,483,648 to 2,147,483,647
- **Size:** 4 bytes
- **Use cases:**

  - counters
  - sizes / lengths
  - most calculations
  - IDs (non-UUID)

```java
int count = 42;
```

---

## 🔹 `long` (64-bit)

- **Range:** about ±9 × 10¹⁸
- **Size:** 8 bytes
- **Use cases:**

  - timestamps
  - large counters
  - database IDs

- Needs **`L`** suffix:

```java
long ms = 1699929299000L;
```

---

# 🌊 **Primitive Decimal Types**

## 🔹 `float` (32-bit float)

- **Precision:** 6–7 decimal digits
- **Range:** ~ ±3.4E38
- **Memory-optimized decimal**
- Use only when:

  - you absolutely need low memory
  - working with graphics (OpenGL, GPU, Android)

```java
float f = 3.14f;
```

---

## 🔹 `double` (64-bit float) ⭐ Default decimal

- **Precision:** 15–16 decimal digits
- **Range:** ~ ±1.7E308
- Standard for calculations
- Perfect for math, physics, analytics

```java
double pi = 3.141592653589793;
```

---

# 🏦 **Arbitrary Precision Number Types**

> _These are full classes (reference types), not primitives._

## 🔹 `BigInteger`

- **Unlimited integer size**
- Cannot overflow
- Used for:

  - cryptography
  - huge math
  - exact integer calculations

```java
BigInteger big = new BigInteger("123456789012345678901234567890");
```

---

## 🔹 `BigDecimal` ⭐

- **Exact decimal math (no floating errors)**
- Used for:

  - finance
  - currency
  - scientific precision
  - anything where accuracy matters

```java
BigDecimal money = new BigDecimal("19.99");
```

⚠️ Always pass **String**, not double:

```java
new BigDecimal("0.1")   // correct
new BigDecimal(0.1)     // WRONG: floating-point error
```

---

# 🧮 **Cheat Table Summary**

| Type         | Bytes    | Range      | Exact? | Typical Use               |
| ------------ | -------- | ---------- | ------ | ------------------------- |
| `byte`       | 1        | −128 → 127 | ✔      | bytes, buffers            |
| `short`      | 2        | −32k → 32k | ✔      | legacy optimizations      |
| `int`        | 4        | −2B → 2B   | ✔      | counters, general numbers |
| `long`       | 8        | huge       | ✔      | timestamps, large IDs     |
| `float`      | 4        | ~±3.4E38   | ❌     | GPU, memory-sensitive     |
| `double`     | 8        | ~±1.7E308  | ❌     | real-number math          |
| `BigInteger` | variable | infinite   | ✔      | crypto, huge numbers      |
| `BigDecimal` | variable | infinite   | ✔      | money, precision-critical |

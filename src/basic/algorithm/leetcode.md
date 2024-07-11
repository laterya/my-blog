---
title: LeetCode Hot 100
date: 2024-07-011
category:
  - basic
tag:
  - basic
  - algorithm
---

## 动态规划

### [爬楼梯](https://leetcode.cn/problems/climbing-stairs/?envType=study-plan-v2&envId=top-100-liked)

```java
class Solution {
    public int climbStairs(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}
```

**错误：n 为 1 时不存在 dp[2]**



修改后：

```java
class Solution {
    public int climbStairs(int n) {
        if (n == 1) {
            return 1;
        }
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

以上代码虽然通过了用例，但是从题目的理解上来说是错误的，dp[0]的值应该为 1，即从第 0 级爬到第 0 级方案数为 1，这么理解才能全部符合状态转移方程`dp[n] = dp[n - 1] + dp[n - 2]`，之所以通过，是因为 dp[0] 在代码中没有影响到 dp[2] 的值



**优化：**

以上的空间复杂度为 O(n)，实际上求 dp[n] 只需要前两个数字，可以使用[滚动数组]的思想将空间复杂度优化到 O(1)

![fig1](assets/70_fig1.gif)

```java
class Solution {
    public int climbStairs(int n) {
        int p = 0, q = 0, r = 1;
        for (int i = 1; i <= n; i++) {
            p = q;
            q = r;
            r = p + q;
        }
        return r;
    }
}
```

需要注意边界，即 n 为 1 时的结果返回



### [打家劫舍]([198. 打家劫舍 - 力扣（LeetCode）](https://leetcode.cn/problems/house-robber/?envType=study-plan-v2&envId=top-100-liked))

```java
class Solution {
    public int rob(int[] nums) {
        int[] dp = new int[nums.length];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (int i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 1] - nums[i - 1] + nums[i]);
        }
        return dp[nums.length - 1];
    }
}
```

错误：dp[i] 的取值有两种情况

- 前一个偷了，那么当前不能偷：`dp[i - 1]`
- 前一个没偷，当前可以偷：`dp[i - 2] + nums[i]`

在第二种情况下，并非是前一个的 dp 值减去前一个偷的 nums，因为前一个不一定偷了（可能偷了反而不是最大）



```java
class Solution {
    public int rob(int[] nums) {
        int[] dp = new int[nums.length];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (int i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[nums.length - 1];
    }
}
```

错误：边界问题，nums.length 为 1 时出界



```java
class Solution {
    public int rob(int[] nums) {
        int[] dp = new int[nums.length];
        if (nums.length == 1) {
            return nums[0];
        }
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (int i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[nums.length - 1];
    }
}
```

- 时间复杂度：O(n)
- 空间复杂度：O(n)

**优化：**

使用滚动数组优化空间复杂度

```java
class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) {
            return nums[0];
        }
        int pre = nums[0], next = Math.max(pre, nums[1]);
        for (int i = 2; i < nums.length; i++) {
            int tmp = Math.max(pre + nums[i], next);
            pre = next;
            next = tmp;
        }
        return next;
    }
}
```

空间复杂度：O(1)

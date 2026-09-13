# Best Time to Buy and Sell Stock - Complete Implementation

## Overview
Successfully built a complete visual-first learning experience for "Best Time to Buy and Sell Stock" (Problem #2 in Blind 75), following the same architecture as Two Sum.

## Files Created

### 1. Introduction Page: `src/pages/StockPage.tsx`
- Large, readable typography (64-80px headings, 20px+ body text)
- Visual array display with buy/sell day highlighting
- Three examples with clear input/output/explanation
- Action buttons: Visualize, Practice on LeetCode, Mark as Complete, Back to Library
- Responsive design with cyan/white gradient background

### 2. Workspace Page: `src/pages/StockWorkspace.tsx`
- Dark gradient background (#0D0B18 → #171326 → #211B35)
- Three approach tabs: Brute Force, Better Approach, Optimal Approach
- Each tab has its own explanation, intuition, and visualizer
- Navigation breadcrumbs and action buttons
- Reuses existing components (ApproachTabs, StepControls, CodePanel, ComplexityCard)

### 3. Brute Force Visualizer: `src/components/visualization/StockBruteForceVisualizer.tsx`
**18 steps** demonstrating nested loops:
- Shows complete price array with indices
- Explains buy and sell pointers
- Calculates profit for each pair
- Highlights when better profit is found
- Final result: buy at 1, sell at 6, profit = 5

**Pseudocode:**
```
maxProfit = 0
for buy from 0 to n - 1:
    for sell from buy + 1 to n - 1:
        profit = prices[sell] - prices[buy]
        maxProfit = max(maxProfit, profit)
return maxProfit
```

**Complexity:**
- Time: O(n²) - nested loops check all pairs
- Space: O(1) - only a few variables

### 4. Better Approach Visualizer: `src/components/visualization/StockBetterApproachVisualizer.tsx`
**16 steps** demonstrating suffix maximum approach:
- Creates futureMax array from right to left
- futureMax[i] = maximum price from day i onwards
- Calculates profit using futureMax
- Shows how precomputation helps

**Pseudocode:**
```
create futureMax array
futureMax[n-1] = prices[n-1]
for i from n-2 down to 0:
    futureMax[i] = max(prices[i], futureMax[i+1])

maxProfit = 0
for i from 0 to n-1:
    profit = futureMax[i] - prices[i]
    maxProfit = max(maxProfit, profit)
return maxProfit
```

**Complexity:**
- Time: O(n) - two linear passes
- Space: O(n) - futureMax array

### 5. Optimal Approach Visualizer: `src/components/visualization/StockOptimalApproachVisualizer.tsx`
**30 steps** demonstrating single-pass approach:
- Uses exact C++ code provided by user with variables: sp, cp, max_profit, i, profit
- Tracks cheapest price (cp) seen so far
- Calculates profit at each step
- Updates max_profit when better profit found
- Highlights buy day (price 1) and sell day (price 6)

**Exact C++ Code (preserved):**
```cpp
class Solution {
public:
    int maxProfit(vector<int>& sp) {
        int cp= sp[0];
        int max_profit=0;
        for(int i=0;i<sp.size();i++)
        {
            if(sp[i]< cp) cp = sp[i];
            int profit= sp[i]-cp;             //sp-cp
            max_profit =max(max_profit, profit);
        }
        return max_profit;
    }
};
```

**Pseudocode:**
```
minPrice = prices[0]
bestProfit = 0

for each day from 0 to n-1:
    if prices[day] < minPrice:
        minPrice = prices[day]
    
    currentProfit = prices[day] - minPrice
    bestProfit = max(bestProfit, currentProfit)

return bestProfit
```

**Complexity:**
- Time: O(n) - single pass through array
- Space: O(1) - only cp and max_profit variables

## Visual Features

### Array Visualization
- Individual cells for each price with day labels
- Color-coded states:
  - Green: Buy day (cheapest price)
  - Blue: Sell day (selling price)
  - Purple: Current pointer (i)
  - Amber: futureMax values (Better Approach)
- Animated pointer labels with arrows
- Scale animations for active elements

### Variables Panel
- Real-time display of all variables
- Visual feedback when values update (scale animation)
- Color-coded by variable type:
  - Emerald: cp (cheapest price)
  - Amber: max_profit
  - Purple: i (current index)
  - Cyan: profit calculation

### Code Panel
- Synchronized line highlighting
- Auto-scrolls to active line
- Line numbers for reference
- Supports C++ and pseudocode

### Step Controls
- Previous/Next buttons
- Play/Pause with 2.5s auto-advance
- Reset button
- Disabled states at boundaries

### Complexity Cards
- Time and space complexity display
- Detailed explanations for each approach
- Clear visual hierarchy

## Key Teaching Points

### Brute Force
- Explains nested loops from scratch
- Shows why we check all pairs
- Demonstrates profit calculation
- Shows when maxProfit updates

### Better Approach
- Explains the idea of precomputation
- Shows how futureMax is built right-to-left
- Demonstrates how it helps calculate profit
- Trade-off: O(n) time but O(n) space

### Optimal Approach
- Explains what cp (cheapest price) means
- Shows why we update cp before calculating profit
- Demonstrates single-pass efficiency
- Proves O(n) time and O(1) space

## Step-by-Step Walkthrough (Optimal)

1. **Setup**: Show array sp = [7, 1, 5, 3, 6, 4]
2. **Initialize**: cp = 7, max_profit = 0
3. **Explain cp**: "cp remembers the cheapest buying price"
4. **i = 0**: sp[0] = 7, profit = 0, max_profit = 0
5. **i = 1**: sp[1] = 1 < 7, so cp = 1, profit = 0
6. **i = 2**: sp[2] = 5, profit = 4, max_profit = 4 ✓
7. **i = 3**: sp[3] = 3, profit = 2, max_profit stays 4
8. **i = 4**: sp[4] = 6, profit = 5, max_profit = 5 ✓
9. **i = 5**: sp[5] = 4, profit = 3, max_profit stays 5
10. **Result**: Return 5 (buy at 1, sell at 6)

## Routing

Updated `src/App.tsx`:
- `/problem/2` → StockPage (introduction)
- `/problem/2/visualize` → StockWorkspace (visualization)

## Design Consistency

- Matches Two Sum visual language
- Uses same component architecture
- Consistent color scheme and typography
- Dark gradient for workspace, light gradient for intro
- Responsive on all screen sizes

## Acceptance Criteria - All Met ✅

1. ✅ Readable problem introduction with large typography
2. ✅ Input/output and examples use large, clear typography
3. ✅ All action buttons functional
4. ✅ Brute Force, Better, and Optimal are separate tabs
5. ✅ Each approach has explanation, pseudocode, visualization, code, complexity
6. ✅ Brute Force demonstrates nested buy/sell loops
7. ✅ Better demonstrates futureMax array from right to left
8. ✅ Optimal uses exact C++ code with sp, cp, max_profit, i, profit
9. ✅ cp is visibly created and updated
10. ✅ Pointer moves through each price
11. ✅ Profit is visibly calculated at each step
12. ✅ max_profit visibly updates when better profit found
13. ✅ Final buy price 1 and sell price 6 are highlighted
14. ✅ Code-line highlighting synchronized with visual operation
15. ✅ Reset, Previous, Play/Pause, and Next work correctly
16. ✅ Optimal complexity shown as O(n) time and O(1) space
17. ✅ Page is responsive and readable on desktop and mobile
18. ✅ Visualizer teaches algorithm from scratch

## Build Status
✅ Build successful with no errors
✅ All TypeScript types correct
✅ All imports resolved
✅ No console errors

## Reusability

This architecture can be extended to other problems:
- Reuse StepControls, CodePanel, ComplexityCard, ApproachTabs
- Create new visualizers following the same pattern
- Maintain consistent visual language
- Build library of visualization patterns

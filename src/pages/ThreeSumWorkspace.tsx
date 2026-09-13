import WorkspaceTemplate from '../components/WorkspaceTemplate';

export default function ThreeSumWorkspace() {
  return (
    <WorkspaceTemplate
      problemId={9}
      title="3Sum"
      topic="Array"
      pattern="Two Pointers"
      difficulty="Medium"
      approaches={{
        brute: {
          title: 'Brute Force: Three Nested Loops',
          description: 'Use three nested loops to check every triplet.',
          intuition: 'Check all possible combinations of three different indices.',
          howItWorks: 'Use three nested loops with indices i, j, k where i < j < k. Check if nums[i] + nums[j] + nums[k] == 0. Store valid triplets in a set to avoid duplicates.',
          tradeoff: 'O(n³) time. Extremely slow for large arrays.',
        },
        better: {
          title: 'Better: Hash Set for Third Element',
          description: 'Fix one element and use a hash set to find the required third element.',
          intuition: 'For each pair (i, j), we need nums[k] = -(nums[i] + nums[j]). Use a hash set to check if this value exists.',
          howItWorks: 'Fix the first element with index i. For each j > i, calculate the required third value and check if it exists in a hash set of previously seen values.',
          tradeoff: 'O(n²) time and O(n) space. Better than brute force but uses extra space.',
        },
        optimal: {
          title: 'Optimal: Sort + Two Pointers',
          description: 'Sort the array and use two pointers to find triplets.',
          intuition: 'After sorting, we can fix one element and use two pointers (left and right) to find pairs that sum to the negative of the fixed element.',
          howItWorks: 'Sort the array. For each index i, set left = i+1 and right = n-1. Calculate sum = nums[i] + nums[left] + nums[right]. If sum == 0, record the triplet. If sum < 0, move left right. If sum > 0, move right left. Skip duplicates to avoid duplicate triplets.',
          tradeoff: 'O(n²) time and O(1) auxiliary space. The most efficient solution.',
        },
      }}
    >
      {(approach) => (
        <div className="p-12 text-center text-gray-500">
          <p className="text-xl mb-4">Visualization for {approach === 'brute' ? 'Brute Force' : approach === 'better' ? 'Better' : 'Optimal'} approach</p>
          <p>Coming soon. The approach explanation above shows the algorithm logic.</p>
        </div>
      )}
    </WorkspaceTemplate>
  );
}

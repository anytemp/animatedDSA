import WorkspaceTemplate from '../components/WorkspaceTemplate';

export default function MaximumProductSubarrayWorkspace() {
  return (
    <WorkspaceTemplate
      problemId={6}
      title="Maximum Product Subarray"
      topic="Array"
      pattern="Dynamic Programming"
      difficulty="Medium"
      approaches={{
        brute: {
          title: 'Brute Force: Check Every Subarray',
          description: 'Check every possible subarray and calculate its product.',
          intuition: 'Use two nested loops to define subarray boundaries and calculate the product of each subarray.',
          howItWorks: 'For each starting index i and ending index j, calculate the product of elements from i to j. Track the maximum product found.',
          tradeoff: 'O(n²) time complexity. Too slow for large arrays.',
        },
        better: {
          title: 'Better: Prefix and Suffix Products',
          description: 'Maintain prefix and suffix products while traversing the array.',
          intuition: 'A negative number can turn a small negative product into a large positive product. Track both prefix and suffix products.',
          howItWorks: 'Traverse from left to right maintaining prefix product, then right to left maintaining suffix product. The answer is the maximum of all prefix and suffix products.',
          tradeoff: 'O(n) time and O(1) space. Handles negative numbers and zeros effectively.',
        },
        optimal: {
          title: 'Optimal: Track Max and Min',
          description: 'Track both currentMax and currentMin at each position.',
          intuition: 'A negative number can turn the smallest negative product into the largest positive product. We need to track both maximum and minimum products.',
          howItWorks: 'At each position, if the current number is negative, swap currentMax and currentMin. Then update currentMax = max(nums[i], currentMax * nums[i]) and currentMin = min(nums[i], currentMin * nums[i]). Track the global maximum.',
          tradeoff: 'O(n) time and O(1) space. The most efficient solution.',
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

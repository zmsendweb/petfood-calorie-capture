
interface ProgressIndicatorProps {
  progressPercentage: number;
  isWeightLoss: boolean;
}

export const ProgressIndicator = ({ progressPercentage, isWeightLoss }: ProgressIndicatorProps) => {
  return (
    <div className="bg-gray-50 p-3 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Current Progress:</span>
        <span className="text-sm font-bold">{progressPercentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary h-2.5 rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {isWeightLoss ? 
          "Weight loss typically accelerates in the middle of the program as your pet adjusts to their new routine." : 
          "Weight gain is typically faster in the middle weeks as your pet's metabolism adjusts to increased nutrition."}
      </p>
    </div>
  );
};

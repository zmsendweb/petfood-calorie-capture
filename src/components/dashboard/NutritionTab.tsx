
import { NutritionQuery } from "../NutritionQuery";

export const NutritionTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Pet Nutrition Assistant</h2>
        <NutritionQuery />
      </div>
    </div>
  );
};


import { PetProfile } from "@/data/types/petTypes";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

interface WeightChartProps {
  weightData: Array<{
    date: string;
    projected: number;
    actual: number | null;
    week: string;
  }>;
  pet: PetProfile;
}

export const WeightChart = ({ weightData, pet }: WeightChartProps) => {
  const chartConfig = {
    projected: {
      label: 'Projected Weight',
      color: '#8884d8'
    },
    actual: {
      label: 'Actual Weight',
      color: '#82ca9d'
    }
  };

  return (
    <div className="w-full h-64">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <LineChart data={weightData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value, index) => index % 2 === 0 ? value : ''}
          />
          <YAxis domain={[
            // Set domain to be 10% below min and 10% above max
            dataMin => Math.floor(dataMin * 0.9),
            dataMax => Math.ceil(dataMax * 1.1)
          ]} />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded-md shadow border">
                    <p className="font-semibold">{data.date} ({data.week})</p>
                    <p className="text-[#8884d8]">
                      Projected: {data.projected} {pet.weightUnit}
                    </p>
                    {data.actual !== null && (
                      <p className="text-[#82ca9d]">
                        Actual: {data.actual} {pet.weightUnit}
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="projected" 
            stroke="#8884d8" 
            strokeDasharray="3 3"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#82ca9d" 
            activeDot={{ r: 8 }}
            strokeWidth={2} 
          />
          
          {/* Add annotation for acceleration period */}
          <ReferenceArea 
            x1={weightData[Math.floor(weightData.length * 0.25)].date} 
            x2={weightData[Math.floor(weightData.length * 0.75)].date} 
            stroke="none"
            fill="#8884d8" 
            fillOpacity={0.1} 
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

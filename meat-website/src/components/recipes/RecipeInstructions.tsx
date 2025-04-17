interface RecipeInstructionsProps {
    instructions: string[];
  }
  
  export default function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-6 text-gray-900">Instructions</h2>
        <ol className="space-y-6">
          {instructions.map((step, index) => (
            <li key={index} className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700 font-bold text-sm mr-4">
                {index + 1}
              </div>
              <div className="text-gray-700 pt-1">{step}</div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
import { useState } from 'react';
import { UserCircle2, Users } from 'lucide-react';

function Choose() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Apply as a Client or Freelancer</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div 
            className={`p-6 cursor-pointer hover:border-blue-500 transition-colors border rounded-lg ${
              selectedType === "freelancer" ? "border-blue-500 border-2" : "border-gray-300"
            }`}
            onClick={() => setSelectedType("freelancer")}
          >
            <div className="flex flex-col items-center gap-2">
              <UserCircle2 className="h-8 w-8" />
              <p className="text-sm font-medium">Apply as Freelancer</p>
            </div>
          </div>
          <div 
            className={`p-6 cursor-pointer hover:border-blue-500 transition-colors border rounded-lg ${
              selectedType === "client" ? "border-blue-500 border-2" : "border-gray-300"
            }`}
            onClick={() => setSelectedType("client")}
          >
            <div className="flex flex-col items-center gap-2">
              <Users className="h-8 w-8" />
              <p className="text-sm font-medium">Apply as Client</p>
            </div>
          </div>
        </div>
        <button 
          className={`w-full py-2 rounded-lg transition-colors ${
            selectedType 
              ? "bg-blue-500 text-white hover:bg-blue-600" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedType}
        >
          {selectedType === "freelancer"
            ? "Create Account as Freelancer"
            : selectedType === "client"
            ? "Create Account as Client"
            : "Create Account"}
        </button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a 
            href="/login" 
            className="font-semibold text-blue-500 hover:text-blue-600"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Choose;
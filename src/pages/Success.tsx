
import { CheckCircle } from "lucide-react";

const Success = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Login realizado com sucesso!</h1>
        <p className="text-gray-600">Suas informações foram salvas com sucesso.</p>
      </div>
    </div>
  );
};

export default Success;

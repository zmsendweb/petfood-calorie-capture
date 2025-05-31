
import { useEffect } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/4b1f088b-a45c-451e-910a-581d714f877a.png" 
              alt="mypetcal logo" 
              className="h-25 w-auto"
            />
          </div>
          <p className="text-muted-foreground mt-2">Sign in to manage your pet's nutrition</p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  );
}

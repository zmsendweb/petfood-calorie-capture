
import React, { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const checkAdminRole = async (currentUser: User) => {
    try {
      console.log('Checking admin role for user:', currentUser.email);
      
      // Check if user is the admin email first
      if (currentUser.email === 'lineupforme2@gmail.com') {
        console.log('User is admin by email');
        setIsAdmin(true);
        return;
      }
      
      // Also check the database for admin role
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', currentUser.id)
        .eq('role', 'admin')
        .maybeSingle();
      
      console.log('Admin role check from DB:', { data, error });
      
      if (!error && data) {
        console.log('User is admin from database');
        setIsAdmin(true);
      } else {
        console.log('User is not admin');
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Get initial session first
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Initial session check:', session?.user?.email || 'No user');
        
        if (error) {
          console.error('Error getting initial session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            // Check admin role asynchronously without blocking
            setTimeout(() => {
              checkAdminRole(session.user);
            }, 0);
          } else {
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email || 'No user');
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check admin role asynchronously without blocking
          setTimeout(() => {
            checkAdminRole(session.user);
          }, 0);
        } else {
          setIsAdmin(false);
        }
        
        if (event === 'SIGNED_OUT') {
          setIsAdmin(false);
          console.log('User signed out, redirecting to auth');
          navigate('/auth');
        }
        
        setLoading(false);
      }
    );

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting to sign in:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }
      
      console.log('Sign in successful:', data.user?.email);
      toast.success("Signed in successfully");
      navigate('/');
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error("Error signing in", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      if (error) throw error;
      
      toast.success("Account created successfully!", {
        description: "Please check your email to verify your account before signing in."
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error("Error signing up", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log('Attempting to sign out');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      console.log('Sign out successful');
      toast.success("Signed out successfully");
      navigate('/auth');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error("Error signing out", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isAdmin,
      signIn, 
      signUp, 
      signOut, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

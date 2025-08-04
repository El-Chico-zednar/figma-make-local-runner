import { createClient } from 'npm:@supabase/supabase-js@2';
import { projectId, publicAnonKey } from './info';

// Create Supabase client for authentication and client-side operations
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Auth helper functions
export class AuthService {
  static async signUp(email: string, password: string, name?: string) {
    try {
      console.log('📝 [AUTH] Attempting to sign up:', email);
      
      // First, register the user via our server endpoint
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-a5f433e2/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      // Now sign in the user to get the session
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log('✅ [AUTH] User signed up and signed in successfully');
      return { data, error: null };
    } catch (error) {
      console.error('❌ [AUTH] Sign up error:', error);
      return { data: null, error };
    }
  }

  static async signIn(email: string, password: string) {
    try {
      console.log('🔑 [AUTH] Attempting to sign in:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log('✅ [AUTH] User signed in successfully');
      return { data, error: null };
    } catch (error) {
      console.error('❌ [AUTH] Sign in error:', error);
      return { data: null, error };
    }
  }

  static async signOut() {
    try {
      console.log('👋 [AUTH] Signing out user');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      console.log('✅ [AUTH] User signed out successfully');
      return { error: null };
    } catch (error) {
      console.error('❌ [AUTH] Sign out error:', error);
      return { error };
    }
  }

  static async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }

      return { session, error: null };
    } catch (error) {
      console.error('❌ [AUTH] Get session error:', error);
      return { session: null, error };
    }
  }

  static onAuthStateChange(callback: (session: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 [AUTH] Auth state changed:', event, session?.user?.email);
      callback(session);
    });
  }
}
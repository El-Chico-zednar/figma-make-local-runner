import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// CORS configuration
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}));

// Logger
app.use('*', logger(console.log));

// Supabase client with service role for admin operations
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// Auth middleware to verify user tokens
async function verifyAuth(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) {
      console.log('❌ [AUTH] Invalid token:', error?.message);
      return null;
    }
    
    console.log('✅ [AUTH] User authenticated:', user.email);
    return user;
  } catch (error) {
    console.log('❌ [AUTH] Auth error:', error);
    return null;
  }
}

// Public routes (no auth required)
app.get('/make-server-a5f433e2/health', (c) => {
  return c.json({ status: 'ok', message: 'Contrast Table Server is running' });
});

// User registration
app.post('/make-server-a5f433e2/auth/register', async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    console.log('📝 [REGISTER] Attempting to register user:', email);
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Create user with auto-confirm since email server isn't configured
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || 'Usuario' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('❌ [REGISTER] Registration error:', error.message);
      return c.json({ error: error.message }, 400);
    }

    console.log('✅ [REGISTER] User registered successfully:', email);
    
    // Initialize user data in KV store
    const userKey = `user_data:${data.user.id}`;
    await kv.set(userKey, {
      projects: {},
      currentProject: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    
    return c.json({ 
      message: 'User registered successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name
      }
    });
  } catch (error) {
    console.error('❌ [REGISTER] Server error:', error);
    return c.json({ error: 'Registration failed' }, 500);
  }
});

// Protected routes (auth required)
app.use('/make-server-a5f433e2/user/*', async (c, next) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  c.set('user', user);
  await next();
});

// Save user data (projects and themes)
app.post('/make-server-a5f433e2/user/save', async (c) => {
  try {
    const user = c.get('user');
    const userData = await c.req.json();
    
    console.log('💾 [SAVE] Saving user data for:', user.email);
    console.log('💾 [SAVE] Data keys:', Object.keys(userData));
    
    const userKey = `user_data:${user.id}`;
    const dataToSave = {
      ...userData,
      updated_at: new Date().toISOString()
    };
    
    await kv.set(userKey, dataToSave);
    
    console.log('✅ [SAVE] User data saved successfully');
    return c.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('❌ [SAVE] Error saving user data:', error);
    return c.json({ error: 'Failed to save data' }, 500);
  }
});

// Load user data
app.get('/make-server-a5f433e2/user/load', async (c) => {
  try {
    const user = c.get('user');
    
    console.log('📂 [LOAD] Loading user data for:', user.email);
    
    const userKey = `user_data:${user.id}`;
    const userData = await kv.get(userKey);
    
    if (!userData) {
      console.log('📂 [LOAD] No existing data, creating default');
      const defaultData = {
        projects: {},
        currentProject: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      await kv.set(userKey, defaultData);
      return c.json(defaultData);
    }
    
    console.log('✅ [LOAD] User data loaded successfully');
    console.log('📂 [LOAD] Projects count:', Object.keys(userData.projects || {}).length);
    
    return c.json(userData);
  } catch (error) {
    console.error('❌ [LOAD] Error loading user data:', error);
    return c.json({ error: 'Failed to load data' }, 500);
  }
});

// Sync data (backup operation)
app.post('/make-server-a5f433e2/user/sync', async (c) => {
  try {
    const user = c.get('user');
    const { localData, lastSync } = await c.req.json();
    
    console.log('🔄 [SYNC] Syncing data for:', user.email);
    
    const userKey = `user_data:${user.id}`;
    const cloudData = await kv.get(userKey);
    
    let mergedData;
    
    if (!cloudData) {
      // No cloud data, use local data
      mergedData = {
        ...localData,
        updated_at: new Date().toISOString()
      };
    } else {
      // Merge logic: use the most recently updated data
      const cloudUpdated = new Date(cloudData.updated_at || 0);
      const localUpdated = new Date(lastSync || 0);
      
      if (cloudUpdated > localUpdated) {
        console.log('🔄 [SYNC] Using cloud data (more recent)');
        mergedData = cloudData;
      } else {
        console.log('🔄 [SYNC] Using local data (more recent)');
        mergedData = {
          ...localData,
          updated_at: new Date().toISOString()
        };
      }
    }
    
    await kv.set(userKey, mergedData);
    
    console.log('✅ [SYNC] Data synced successfully');
    return c.json({
      success: true,
      data: mergedData,
      message: 'Data synced successfully'
    });
  } catch (error) {
    console.error('❌ [SYNC] Error syncing data:', error);
    return c.json({ error: 'Failed to sync data' }, 500);
  }
});

// Error handling
app.onError((err, c) => {
  console.error('❌ [SERVER] Unhandled error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Route not found' }, 404);
});

// Start server
console.log('🚀 [SERVER] Contrast Table Server starting...');
Deno.serve(app.fetch);
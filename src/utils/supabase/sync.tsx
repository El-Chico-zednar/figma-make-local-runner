import { projectId, publicAnonKey } from './info';
import { Project } from '../../components/ProjectStorage';

export interface CloudUserData {
  projects: { [key: string]: Project };
  currentProject: {
    projectId: string;
    projectName: string;
    themeId: string;
    themeName: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export class CloudSyncService {
  private static async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-a5f433e2${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Request failed: ${response.status}`);
    }

    return response.json();
  }

  static async saveUserData(accessToken: string, userData: CloudUserData): Promise<void> {
    try {
      console.log('☁️ [CLOUD] Saving user data to cloud...');
      
      await this.makeRequest('/user/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      console.log('✅ [CLOUD] User data saved to cloud successfully');
    } catch (error) {
      console.error('❌ [CLOUD] Failed to save user data:', error);
      throw error;
    }
  }

  static async loadUserData(accessToken: string): Promise<CloudUserData> {
    try {
      console.log('☁️ [CLOUD] Loading user data from cloud...');
      
      const userData = await this.makeRequest('/user/load', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log('✅ [CLOUD] User data loaded from cloud successfully');
      console.log('📊 [CLOUD] Projects loaded:', Object.keys(userData.projects || {}).length);
      
      return userData;
    } catch (error) {
      console.error('❌ [CLOUD] Failed to load user data:', error);
      throw error;
    }
  }

  static async syncData(
    accessToken: string, 
    localData: CloudUserData, 
    lastSync?: string
  ): Promise<CloudUserData> {
    try {
      console.log('🔄 [CLOUD] Syncing data with cloud...');
      
      const result = await this.makeRequest('/user/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ localData, lastSync }),
      });

      console.log('✅ [CLOUD] Data synced successfully');
      return result.data;
    } catch (error) {
      console.error('❌ [CLOUD] Failed to sync data:', error);
      throw error;
    }
  }
}
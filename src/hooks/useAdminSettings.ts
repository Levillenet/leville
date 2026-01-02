import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Types matching database schema
export interface DbPropertySettings {
  id?: string;
  property_id: string;
  marketing_name: string | null;
  cleaning_fee: number;
  discount_1_night: number;
  discount_2_nights: number;
  discount_3_plus_nights: number;
  show_discount: boolean;
}

export interface DbPeriodSettings {
  id?: string;
  property_id: string;
  check_in: string;
  check_out: string;
  has_ski_pass: boolean;
  has_special_offer: boolean;
  custom_discount: number;
  show_discount: boolean;
}

export interface DbSkiPassCapacity {
  id?: string;
  date: string;
  allocated_passes: number;
  max_passes: number;
}

interface AdminSettingsResponse {
  propertySettings: DbPropertySettings[];
  periodSettings: DbPeriodSettings[];
  skiPassCapacity: DbSkiPassCapacity[];
}

// Fetch all settings from database
const fetchAdminSettings = async (): Promise<AdminSettingsResponse> => {
  const { data, error } = await supabase.functions.invoke('admin-settings', {
    body: { action: 'get_all_settings' }
  });
  
  if (error) {
    console.error('Error fetching admin settings:', error);
    throw error;
  }
  
  return data;
};

// Hook for reading admin settings (for frontend display)
export const useAdminSettings = () => {
  return useQuery({
    queryKey: ['admin-settings'],
    queryFn: fetchAdminSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for admin panel with write operations
export const useAdminSettingsManager = (adminPassword: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: settings, isLoading, refetch } = useAdminSettings();
  
  // Upsert property settings
  const upsertProperty = useMutation({
    mutationFn: async (propertyData: Partial<DbPropertySettings> & { property_id: string }) => {
      const { data, error } = await supabase.functions.invoke('admin-settings', {
        body: { 
          action: 'upsert_property', 
          password: adminPassword,
          data: propertyData
        }
      });
      
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast({ title: 'Tallennettu', description: 'Huoneiston asetukset päivitetty' });
    },
    onError: (error) => {
      console.error('Error saving property:', error);
      toast({ 
        title: 'Virhe', 
        description: 'Asetusten tallennus epäonnistui',
        variant: 'destructive'
      });
    }
  });
  
  // Upsert period settings
  const upsertPeriod = useMutation({
    mutationFn: async (periodData: DbPeriodSettings) => {
      const { data, error } = await supabase.functions.invoke('admin-settings', {
        body: { 
          action: 'upsert_period', 
          password: adminPassword,
          data: periodData
        }
      });
      
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
    },
    onError: (error) => {
      console.error('Error saving period:', error);
      toast({ 
        title: 'Virhe', 
        description: 'Jaksoasetusten tallennus epäonnistui',
        variant: 'destructive'
      });
    }
  });
  
  // Update ski pass capacity
  const updateCapacity = useMutation({
    mutationFn: async (capacityData: DbSkiPassCapacity) => {
      const { data, error } = await supabase.functions.invoke('admin-settings', {
        body: { 
          action: 'update_capacity', 
          password: adminPassword,
          data: capacityData
        }
      });
      
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
    },
    onError: (error) => {
      console.error('Error updating capacity:', error);
      toast({ 
        title: 'Virhe', 
        description: 'Kapasiteetin päivitys epäonnistui',
        variant: 'destructive'
      });
    }
  });
  
  // Reset single property
  const resetProperty = useMutation({
    mutationFn: async (propertyId: string) => {
      const { data, error } = await supabase.functions.invoke('admin-settings', {
        body: { 
          action: 'reset_property', 
          password: adminPassword,
          data: { property_id: propertyId }
        }
      });
      
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast({ title: 'Palautettu', description: 'Huoneisto palautettu oletusarvoihin' });
    },
    onError: (error) => {
      console.error('Error resetting property:', error);
      toast({ 
        title: 'Virhe', 
        description: 'Palautus epäonnistui',
        variant: 'destructive'
      });
    }
  });
  
  // Reset all settings
  const resetAll = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-settings', {
        body: { 
          action: 'reset_all', 
          password: adminPassword
        }
      });
      
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      toast({ title: 'Palautettu', description: 'Kaikki asetukset palautettu oletusarvoihin' });
    },
    onError: (error) => {
      console.error('Error resetting all:', error);
      toast({ 
        title: 'Virhe', 
        description: 'Palautus epäonnistui',
        variant: 'destructive'
      });
    }
  });
  
  return {
    settings,
    isLoading,
    refetch,
    upsertProperty: upsertProperty.mutate,
    upsertPeriod: upsertPeriod.mutate,
    updateCapacity: updateCapacity.mutate,
    resetProperty: resetProperty.mutate,
    resetAll: resetAll.mutate,
    isSaving: upsertProperty.isPending || upsertPeriod.isPending || updateCapacity.isPending
  };
};

// Helper to get property settings with database override
export const getPropertySettingsFromDb = (
  propertyId: string, 
  dbSettings: DbPropertySettings[] | undefined
): DbPropertySettings | undefined => {
  return dbSettings?.find(s => s.property_id === propertyId);
};

// Helper to get period settings from database
export const getPeriodSettingsFromDb = (
  propertyId: string,
  checkIn: string,
  checkOut: string,
  dbSettings: DbPeriodSettings[] | undefined
): DbPeriodSettings | undefined => {
  return dbSettings?.find(
    s => s.property_id === propertyId && s.check_in === checkIn && s.check_out === checkOut
  );
};

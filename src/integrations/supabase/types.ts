export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_invitations: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string | null
          id: string
          invited_by: string | null
          used_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at?: string | null
          id?: string
          invited_by?: string | null
          used_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          invited_by?: string | null
          used_at?: string | null
        }
        Relationships: []
      }
      aurora_alerts: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          language: string | null
          last_alert_sent: string | null
          unsubscribe_token: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          language?: string | null
          last_alert_sent?: string | null
          unsubscribe_token?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          language?: string | null
          last_alert_sent?: string | null
          unsubscribe_token?: string | null
        }
        Relationships: []
      }
      beds24_cache: {
        Row: {
          data: Json
          fetched_at: string
          id: string
        }
        Insert: {
          data: Json
          fetched_at?: string
          id: string
        }
        Update: {
          data?: Json
          fetched_at?: string
          id?: string
        }
        Relationships: []
      }
      download_logs: {
        Row: {
          document_type: string
          downloaded_at: string
          id: string
          language: string | null
          user_agent: string | null
        }
        Insert: {
          document_type: string
          downloaded_at?: string
          id?: string
          language?: string | null
          user_agent?: string | null
        }
        Update: {
          document_type?: string
          downloaded_at?: string
          id?: string
          language?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      maintenance_settings: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          id: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      period_settings: {
        Row: {
          check_in: string
          check_out: string
          created_at: string | null
          custom_discount: number | null
          has_ski_pass: boolean | null
          has_special_offer: boolean | null
          id: string
          property_id: string
          show_discount: boolean | null
          updated_at: string | null
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string | null
          custom_discount?: number | null
          has_ski_pass?: boolean | null
          has_special_offer?: boolean | null
          id?: string
          property_id: string
          show_discount?: boolean | null
          updated_at?: string | null
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string | null
          custom_discount?: number | null
          has_ski_pass?: boolean | null
          has_special_offer?: boolean | null
          id?: string
          property_id?: string
          show_discount?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      property_maintenance: {
        Row: {
          cleaning_email: string | null
          cleaning_fee: number | null
          created_at: string | null
          id: string
          linen_price_per_person: number | null
          max_guests: number | null
          notes: string | null
          owner_email: string | null
          property_id: string
          updated_at: string | null
        }
        Insert: {
          cleaning_email?: string | null
          cleaning_fee?: number | null
          created_at?: string | null
          id?: string
          linen_price_per_person?: number | null
          max_guests?: number | null
          notes?: string | null
          owner_email?: string | null
          property_id: string
          updated_at?: string | null
        }
        Update: {
          cleaning_email?: string | null
          cleaning_fee?: number | null
          created_at?: string | null
          id?: string
          linen_price_per_person?: number | null
          max_guests?: number | null
          notes?: string | null
          owner_email?: string | null
          property_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      property_settings: {
        Row: {
          cleaning_fee: number | null
          created_at: string | null
          discount_1_night: number | null
          discount_2_nights: number | null
          discount_3_plus_nights: number | null
          id: string
          marketing_name: string | null
          property_id: string
          show_discount: boolean | null
          updated_at: string | null
        }
        Insert: {
          cleaning_fee?: number | null
          created_at?: string | null
          discount_1_night?: number | null
          discount_2_nights?: number | null
          discount_3_plus_nights?: number | null
          id?: string
          marketing_name?: string | null
          property_id: string
          show_discount?: boolean | null
          updated_at?: string | null
        }
        Update: {
          cleaning_fee?: number | null
          created_at?: string | null
          discount_1_night?: number | null
          discount_2_nights?: number | null
          discount_3_plus_nights?: number | null
          id?: string
          marketing_name?: string | null
          property_id?: string
          show_discount?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          value: Json
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      ski_pass_capacity: {
        Row: {
          allocated_passes: number | null
          created_at: string | null
          date: string
          id: string
          max_passes: number | null
          updated_at: string | null
        }
        Insert: {
          allocated_passes?: number | null
          created_at?: string | null
          date: string
          id?: string
          max_passes?: number | null
          updated_at?: string | null
        }
        Update: {
          allocated_passes?: number | null
          created_at?: string | null
          date?: string
          id?: string
          max_passes?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "super_admin"],
    },
  },
} as const

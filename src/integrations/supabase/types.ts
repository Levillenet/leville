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
      cleaning_status: {
        Row: {
          booking_id: string | null
          check_in_date: string
          cleaned_at: string | null
          cleaned_by: string | null
          created_at: string | null
          guest_email: string | null
          guest_name: string | null
          guest_phone: string | null
          id: string
          notification_sent_at: string | null
          property_id: string
          updated_at: string | null
        }
        Insert: {
          booking_id?: string | null
          check_in_date: string
          cleaned_at?: string | null
          cleaned_by?: string | null
          created_at?: string | null
          guest_email?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          id?: string
          notification_sent_at?: string | null
          property_id: string
          updated_at?: string | null
        }
        Update: {
          booking_id?: string | null
          check_in_date?: string
          cleaned_at?: string | null
          cleaned_by?: string | null
          created_at?: string | null
          guest_email?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          id?: string
          notification_sent_at?: string | null
          property_id?: string
          updated_at?: string | null
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
      heat_pump_defrost_log: {
        Row: {
          created_at: string | null
          device_id: number
          duration_seconds: number | null
          ended_at: string | null
          id: string
          started_at: string
        }
        Insert: {
          created_at?: string | null
          device_id: number
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          started_at?: string
        }
        Update: {
          created_at?: string | null
          device_id?: number
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          started_at?: string
        }
        Relationships: []
      }
      heat_pump_history: {
        Row: {
          device_id: number
          fan_speed: number | null
          id: string
          operating_state: string
          operation_mode: string | null
          outdoor_temperature: number | null
          power: boolean | null
          recorded_at: string | null
          room_temperature: number | null
          set_temperature: number | null
        }
        Insert: {
          device_id: number
          fan_speed?: number | null
          id?: string
          operating_state: string
          operation_mode?: string | null
          outdoor_temperature?: number | null
          power?: boolean | null
          recorded_at?: string | null
          room_temperature?: number | null
          set_temperature?: number | null
        }
        Update: {
          device_id?: number
          fan_speed?: number | null
          id?: string
          operating_state?: string
          operation_mode?: string | null
          outdoor_temperature?: number | null
          power?: boolean | null
          recorded_at?: string | null
          room_temperature?: number | null
          set_temperature?: number | null
        }
        Relationships: []
      }
      heat_pump_settings: {
        Row: {
          created_at: string | null
          device_id: number
          device_name: string | null
          fan_auto_recovery: boolean | null
          fan_recovery_delay_minutes: number | null
          id: string
          last_known_state: string | null
          pending_fan_recovery_at: string | null
          pending_fan_speed: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          device_id: number
          device_name?: string | null
          fan_auto_recovery?: boolean | null
          fan_recovery_delay_minutes?: number | null
          id?: string
          last_known_state?: string | null
          pending_fan_recovery_at?: string | null
          pending_fan_speed?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: number
          device_name?: string | null
          fan_auto_recovery?: boolean | null
          fan_recovery_delay_minutes?: number | null
          id?: string
          last_known_state?: string | null
          pending_fan_recovery_at?: string | null
          pending_fan_speed?: number | null
          updated_at?: string | null
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
      moder_property_mapping: {
        Row: {
          beds24_room_id: string
          cleaning_fee: number | null
          created_at: string | null
          id: string
          linen_price: number | null
          max_guests: number | null
          moder_room_type_id: number | null
          property_name: string
          updated_at: string | null
        }
        Insert: {
          beds24_room_id: string
          cleaning_fee?: number | null
          created_at?: string | null
          id?: string
          linen_price?: number | null
          max_guests?: number | null
          moder_room_type_id?: number | null
          property_name: string
          updated_at?: string | null
        }
        Update: {
          beds24_room_id?: string
          cleaning_fee?: number | null
          created_at?: string | null
          id?: string
          linen_price?: number | null
          max_guests?: number | null
          moder_room_type_id?: number | null
          property_name?: string
          updated_at?: string | null
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

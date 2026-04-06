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
      apartment_maintenance: {
        Row: {
          apartment_id: string
          contact_email_override: string | null
          created_at: string
          id: string
          maintenance_company_id: string | null
          property_id: string | null
        }
        Insert: {
          apartment_id: string
          contact_email_override?: string | null
          created_at?: string
          id?: string
          maintenance_company_id?: string | null
          property_id?: string | null
        }
        Update: {
          apartment_id?: string
          contact_email_override?: string | null
          created_at?: string
          id?: string
          maintenance_company_id?: string | null
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apartment_maintenance_maintenance_company_id_fkey"
            columns: ["maintenance_company_id"]
            isOneToOne: false
            referencedRelation: "maintenance_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apartment_maintenance_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
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
      booking_terms: {
        Row: {
          content_de: string | null
          content_en: string | null
          content_es: string | null
          content_fi: string
          content_fr: string | null
          content_sv: string | null
          created_at: string
          id: string
          section_key: string
          sort_order: number
          title_de: string | null
          title_en: string | null
          title_es: string | null
          title_fi: string
          title_fr: string | null
          title_sv: string | null
          translations_updated_at: string | null
          updated_at: string
        }
        Insert: {
          content_de?: string | null
          content_en?: string | null
          content_es?: string | null
          content_fi: string
          content_fr?: string | null
          content_sv?: string | null
          created_at?: string
          id?: string
          section_key: string
          sort_order?: number
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          title_fi: string
          title_fr?: string | null
          title_sv?: string | null
          translations_updated_at?: string | null
          updated_at?: string
        }
        Update: {
          content_de?: string | null
          content_en?: string | null
          content_es?: string | null
          content_fi?: string
          content_fr?: string | null
          content_sv?: string | null
          created_at?: string
          id?: string
          section_key?: string
          sort_order?: number
          title_de?: string | null
          title_en?: string | null
          title_es?: string | null
          title_fi?: string
          title_fr?: string | null
          title_sv?: string | null
          translations_updated_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      chatbot_logs: {
        Row: {
          bot_response: string | null
          created_at: string
          detected_language: string | null
          id: string
          property_mentioned: string | null
          user_message: string
        }
        Insert: {
          bot_response?: string | null
          created_at?: string
          detected_language?: string | null
          id?: string
          property_mentioned?: string | null
          user_message: string
        }
        Update: {
          bot_response?: string | null
          created_at?: string
          detected_language?: string | null
          id?: string
          property_mentioned?: string | null
          user_message?: string
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
      floor_heating_history: {
        Row: {
          air_temperature: number | null
          apartment_code: string
          created_at: string | null
          device_id: string
          device_name: string
          floor_temperature: number | null
          homey_id: string
          homey_name: string | null
          id: string
          power_on: boolean | null
          recorded_at: string | null
          target_temperature: number | null
        }
        Insert: {
          air_temperature?: number | null
          apartment_code: string
          created_at?: string | null
          device_id: string
          device_name: string
          floor_temperature?: number | null
          homey_id: string
          homey_name?: string | null
          id?: string
          power_on?: boolean | null
          recorded_at?: string | null
          target_temperature?: number | null
        }
        Update: {
          air_temperature?: number | null
          apartment_code?: string
          created_at?: string | null
          device_id?: string
          device_name?: string
          floor_temperature?: number | null
          homey_id?: string
          homey_name?: string | null
          id?: string
          power_on?: boolean | null
          recorded_at?: string | null
          target_temperature?: number | null
        }
        Relationships: []
      }
      guide_images: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          property_id: string
          section_key: string | null
          sort_order: number
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          property_id: string
          section_key?: string | null
          sort_order?: number
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          property_id?: string
          section_key?: string | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "guide_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "guide_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_properties: {
        Row: {
          address: string | null
          bathrooms: string | null
          bedrooms: string | null
          check_in_time: string | null
          check_out_time: string | null
          contact_email: string | null
          contact_phone: string | null
          contact_whatsapp: string | null
          created_at: string
          hero_image_url: string | null
          id: string
          is_published: boolean | null
          latitude: number | null
          longitude: number | null
          max_guests: number | null
          name: string
          slug: string
          updated_at: string
          wifi_name: string | null
          wifi_password: string | null
        }
        Insert: {
          address?: string | null
          bathrooms?: string | null
          bedrooms?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_whatsapp?: string | null
          created_at?: string
          hero_image_url?: string | null
          id?: string
          is_published?: boolean | null
          latitude?: number | null
          longitude?: number | null
          max_guests?: number | null
          name: string
          slug: string
          updated_at?: string
          wifi_name?: string | null
          wifi_password?: string | null
        }
        Update: {
          address?: string | null
          bathrooms?: string | null
          bedrooms?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_whatsapp?: string | null
          created_at?: string
          hero_image_url?: string | null
          id?: string
          is_published?: boolean | null
          latitude?: number | null
          longitude?: number | null
          max_guests?: number | null
          name?: string
          slug?: string
          updated_at?: string
          wifi_name?: string | null
          wifi_password?: string | null
        }
        Relationships: []
      }
      guide_sections: {
        Row: {
          content: string | null
          created_at: string
          icon: string | null
          id: string
          is_visible: boolean | null
          property_id: string
          section_key: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          property_id: string
          section_key: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          property_id?: string
          section_key?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_sections_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "guide_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      heat_pump_checkout_drop_log: {
        Row: {
          created_at: string
          device_id: number
          dropped_at: string
          from_temperature: number | null
          id: string
          property_id: string
          to_temperature: number
        }
        Insert: {
          created_at?: string
          device_id: number
          dropped_at?: string
          from_temperature?: number | null
          id?: string
          property_id: string
          to_temperature: number
        }
        Update: {
          created_at?: string
          device_id?: number
          dropped_at?: string
          from_temperature?: number | null
          id?: string
          property_id?: string
          to_temperature?: number
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
      heat_pump_efficiency_metrics: {
        Row: {
          created_at: string | null
          degree_minutes: number | null
          device_id: number
          efficiency_status: string | null
          id: string
          notes: string | null
          outdoor_temp_at_calculation: number | null
          recorded_at: string | null
          recovery_speed: number | null
          temp_debt: number | null
        }
        Insert: {
          created_at?: string | null
          degree_minutes?: number | null
          device_id: number
          efficiency_status?: string | null
          id?: string
          notes?: string | null
          outdoor_temp_at_calculation?: number | null
          recorded_at?: string | null
          recovery_speed?: number | null
          temp_debt?: number | null
        }
        Update: {
          created_at?: string | null
          degree_minutes?: number | null
          device_id?: number
          efficiency_status?: string | null
          id?: string
          notes?: string | null
          outdoor_temp_at_calculation?: number | null
          recorded_at?: string | null
          recovery_speed?: number | null
          temp_debt?: number | null
        }
        Relationships: []
      }
      heat_pump_fan_reset_log: {
        Row: {
          created_at: string
          device_id: number
          from_fan_speed: number
          id: string
          reset_at: string
          to_fan_speed: number
        }
        Insert: {
          created_at?: string
          device_id: number
          from_fan_speed: number
          id?: string
          reset_at?: string
          to_fan_speed: number
        }
        Update: {
          created_at?: string
          device_id?: number
          from_fan_speed?: number
          id?: string
          reset_at?: string
          to_fan_speed?: number
        }
        Relationships: []
      }
      heat_pump_fleet_baseline: {
        Row: {
          created_at: string | null
          device_count: number | null
          fleet_avg_recovery_speed: number | null
          fleet_avg_temp_debt: number | null
          id: string
          outdoor_temp_range: string
          sample_count: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          device_count?: number | null
          fleet_avg_recovery_speed?: number | null
          fleet_avg_temp_debt?: number | null
          id?: string
          outdoor_temp_range: string
          sample_count?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          device_count?: number | null
          fleet_avg_recovery_speed?: number | null
          fleet_avg_temp_debt?: number | null
          id?: string
          outdoor_temp_range?: string
          sample_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      heat_pump_global_settings: {
        Row: {
          checkout_drop_enabled: boolean
          checkout_drop_temperature: number
          checkout_drop_time: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          checkout_drop_enabled?: boolean
          checkout_drop_temperature?: number
          checkout_drop_time?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          checkout_drop_enabled?: boolean
          checkout_drop_temperature?: number
          checkout_drop_time?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      heat_pump_history: {
        Row: {
          actual_outdoor_temp: number | null
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
          actual_outdoor_temp?: number | null
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
          actual_outdoor_temp?: number | null
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
      heat_pump_performance_baseline: {
        Row: {
          avg_recovery_speed: number | null
          avg_temp_debt: number | null
          created_at: string | null
          device_id: number
          id: string
          outdoor_temp_range: string
          sample_count: number | null
          total_recovery_time_seconds: number | null
          updated_at: string | null
        }
        Insert: {
          avg_recovery_speed?: number | null
          avg_temp_debt?: number | null
          created_at?: string | null
          device_id: number
          id?: string
          outdoor_temp_range: string
          sample_count?: number | null
          total_recovery_time_seconds?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_recovery_speed?: number | null
          avg_temp_debt?: number | null
          created_at?: string | null
          device_id?: number
          id?: string
          outdoor_temp_range?: string
          sample_count?: number | null
          total_recovery_time_seconds?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      heat_pump_recovery_log: {
        Row: {
          created_at: string | null
          defrost_ended_at: string
          device_id: number
          id: string
          outdoor_temperature: number | null
          recovery_duration_seconds: number | null
          recovery_speed: number | null
          target_reached_at: string | null
          temperature_delta: number | null
        }
        Insert: {
          created_at?: string | null
          defrost_ended_at: string
          device_id: number
          id?: string
          outdoor_temperature?: number | null
          recovery_duration_seconds?: number | null
          recovery_speed?: number | null
          target_reached_at?: string | null
          temperature_delta?: number | null
        }
        Update: {
          created_at?: string | null
          defrost_ended_at?: string
          device_id?: number
          id?: string
          outdoor_temperature?: number | null
          recovery_duration_seconds?: number | null
          recovery_speed?: number | null
          target_reached_at?: string | null
          temperature_delta?: number | null
        }
        Relationships: []
      }
      heat_pump_settings: {
        Row: {
          created_at: string | null
          degree_minutes: number | null
          device_id: number
          device_name: string | null
          efficiency_status: string | null
          fan_auto_recovery: boolean | null
          fan_recovery_delay_minutes: number | null
          id: string
          last_known_state: string | null
          max_temp_limit: number | null
          max_temp_reset_delay_minutes: number | null
          max_temp_reset_enabled: boolean | null
          next_checkout_drop_at: string | null
          original_set_temperature: number | null
          pending_fan_recovery_at: string | null
          pending_fan_speed: number | null
          pending_temp_reset_at: string | null
          recovery_tracking_start_temp: number | null
          recovery_tracking_started_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          degree_minutes?: number | null
          device_id: number
          device_name?: string | null
          efficiency_status?: string | null
          fan_auto_recovery?: boolean | null
          fan_recovery_delay_minutes?: number | null
          id?: string
          last_known_state?: string | null
          max_temp_limit?: number | null
          max_temp_reset_delay_minutes?: number | null
          max_temp_reset_enabled?: boolean | null
          next_checkout_drop_at?: string | null
          original_set_temperature?: number | null
          pending_fan_recovery_at?: string | null
          pending_fan_speed?: number | null
          pending_temp_reset_at?: string | null
          recovery_tracking_start_temp?: number | null
          recovery_tracking_started_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          degree_minutes?: number | null
          device_id?: number
          device_name?: string | null
          efficiency_status?: string | null
          fan_auto_recovery?: boolean | null
          fan_recovery_delay_minutes?: number | null
          id?: string
          last_known_state?: string | null
          max_temp_limit?: number | null
          max_temp_reset_delay_minutes?: number | null
          max_temp_reset_enabled?: boolean | null
          next_checkout_drop_at?: string | null
          original_set_temperature?: number | null
          pending_fan_recovery_at?: string | null
          pending_fan_speed?: number | null
          pending_temp_reset_at?: string | null
          recovery_tracking_start_temp?: number | null
          recovery_tracking_started_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      heat_pump_temp_reset_log: {
        Row: {
          created_at: string
          device_id: number
          id: string
          original_temperature: number
          reset_at: string
          reset_to_temperature: number
        }
        Insert: {
          created_at?: string
          device_id: number
          id?: string
          original_temperature: number
          reset_at?: string
          reset_to_temperature: number
        }
        Update: {
          created_at?: string
          device_id?: number
          id?: string
          original_temperature?: number
          reset_at?: string
          reset_to_temperature?: number
        }
        Relationships: []
      }
      maintenance_companies: {
        Row: {
          company_types: string[]
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
        }
        Insert: {
          company_types?: string[]
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
        }
        Update: {
          company_types?: string[]
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
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
      message_logs: {
        Row: {
          apartment_name: string | null
          guest_name: string
          id: string
          message_content: string
          phone: string
          sent_at: string | null
          sent_by: string | null
          template_name: string | null
        }
        Insert: {
          apartment_name?: string | null
          guest_name: string
          id?: string
          message_content: string
          phone: string
          sent_at?: string | null
          sent_by?: string | null
          template_name?: string | null
        }
        Update: {
          apartment_name?: string | null
          guest_name?: string
          id?: string
          message_content?: string
          phone?: string
          sent_at?: string | null
          sent_by?: string | null
          template_name?: string | null
        }
        Relationships: []
      }
      message_templates: {
        Row: {
          created_at: string | null
          id: string
          is_default: boolean | null
          message: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          message: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          message?: string
          name?: string
          updated_at?: string | null
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
      page_views: {
        Row: {
          created_at: string
          device_type: string | null
          id: string
          language: string | null
          path: string
          referrer: string | null
          scroll_depth: number | null
          session_id: string | null
          time_on_page: number | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string
          device_type?: string | null
          id?: string
          language?: string | null
          path: string
          referrer?: string | null
          scroll_depth?: number | null
          session_id?: string | null
          time_on_page?: number | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string
          device_type?: string | null
          id?: string
          language?: string | null
          path?: string
          referrer?: string | null
          scroll_depth?: number | null
          session_id?: string | null
          time_on_page?: number | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
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
      promo_banners: {
        Row: {
          button_text_de: string | null
          button_text_en: string | null
          button_text_es: string | null
          button_text_fi: string | null
          button_text_fr: string | null
          button_text_nl: string | null
          button_text_sv: string | null
          created_at: string
          expires_at: string
          heading_de: string | null
          heading_en: string | null
          heading_es: string | null
          heading_fi: string | null
          heading_fr: string | null
          heading_nl: string | null
          heading_sv: string | null
          id: string
          is_active: boolean
          redirect_localized: boolean
          route_key: string | null
          starts_at: string
          subtext_de: string | null
          subtext_en: string | null
          subtext_es: string | null
          subtext_fi: string | null
          subtext_fr: string | null
          subtext_nl: string | null
          subtext_sv: string | null
          target_url: string
          theme: string
          title: string
        }
        Insert: {
          button_text_de?: string | null
          button_text_en?: string | null
          button_text_es?: string | null
          button_text_fi?: string | null
          button_text_fr?: string | null
          button_text_nl?: string | null
          button_text_sv?: string | null
          created_at?: string
          expires_at: string
          heading_de?: string | null
          heading_en?: string | null
          heading_es?: string | null
          heading_fi?: string | null
          heading_fr?: string | null
          heading_nl?: string | null
          heading_sv?: string | null
          id?: string
          is_active?: boolean
          redirect_localized?: boolean
          route_key?: string | null
          starts_at?: string
          subtext_de?: string | null
          subtext_en?: string | null
          subtext_es?: string | null
          subtext_fi?: string | null
          subtext_fr?: string | null
          subtext_nl?: string | null
          subtext_sv?: string | null
          target_url?: string
          theme?: string
          title: string
        }
        Update: {
          button_text_de?: string | null
          button_text_en?: string | null
          button_text_es?: string | null
          button_text_fi?: string | null
          button_text_fr?: string | null
          button_text_nl?: string | null
          button_text_sv?: string | null
          created_at?: string
          expires_at?: string
          heading_de?: string | null
          heading_en?: string | null
          heading_es?: string | null
          heading_fi?: string | null
          heading_fr?: string | null
          heading_nl?: string | null
          heading_sv?: string | null
          id?: string
          is_active?: boolean
          redirect_localized?: boolean
          route_key?: string | null
          starts_at?: string
          subtext_de?: string | null
          subtext_en?: string | null
          subtext_es?: string | null
          subtext_fi?: string | null
          subtext_fr?: string | null
          subtext_nl?: string | null
          subtext_sv?: string | null
          target_url?: string
          theme?: string
          title?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          business_id: string | null
          contact_email: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          business_id?: string | null
          contact_email?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          business_id?: string | null
          contact_email?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      property_maintenance: {
        Row: {
          cleaning_email: string | null
          cleaning_fee: number | null
          created_at: string | null
          heat_pump_name: string | null
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
          heat_pump_name?: string | null
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
          heat_pump_name?: string | null
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
      seo_pages: {
        Row: {
          component_name: string
          created_at: string
          id: string
          is_published: boolean
          lang: string
          path: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          component_name: string
          created_at?: string
          id?: string
          is_published?: boolean
          lang?: string
          path: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          component_name?: string
          created_at?: string
          id?: string
          is_published?: boolean
          lang?: string
          path?: string
          sort_order?: number
          title?: string
          updated_at?: string
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
      ticket_categories: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      ticket_email_log: {
        Row: {
          email_type: string | null
          error_message: string | null
          id: string
          scheduled_for: string | null
          sent_at: string
          sent_to: string
          status: string
          ticket_id: string
        }
        Insert: {
          email_type?: string | null
          error_message?: string | null
          id?: string
          scheduled_for?: string | null
          sent_at?: string
          sent_to: string
          status?: string
          ticket_id: string
        }
        Update: {
          email_type?: string | null
          error_message?: string | null
          id?: string
          scheduled_for?: string | null
          sent_at?: string
          sent_to?: string
          status?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_email_log_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_history: {
        Row: {
          action_type: string
          changed_at: string
          changed_by: string | null
          field_changed: string | null
          id: string
          new_value: string | null
          old_value: string | null
          ticket_id: string
        }
        Insert: {
          action_type?: string
          changed_at?: string
          changed_by?: string | null
          field_changed?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          ticket_id: string
        }
        Update: {
          action_type?: string
          changed_at?: string
          changed_by?: string | null
          field_changed?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_history_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          apartment_id: string
          category_id: string | null
          created_at: string
          description: string | null
          email_override: string | null
          id: string
          notes: string | null
          priority: Database["public"]["Enums"]["ticket_priority"]
          property_id: string | null
          recurrence_months: number | null
          recurrence_note: string | null
          recurrence_source_id: string | null
          send_email: boolean
          status: Database["public"]["Enums"]["ticket_status"]
          target_type: string
          title: string
          type: Database["public"]["Enums"]["ticket_type"]
          updated_at: string
        }
        Insert: {
          apartment_id: string
          category_id?: string | null
          created_at?: string
          description?: string | null
          email_override?: string | null
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["ticket_priority"]
          property_id?: string | null
          recurrence_months?: number | null
          recurrence_note?: string | null
          recurrence_source_id?: string | null
          send_email?: boolean
          status?: Database["public"]["Enums"]["ticket_status"]
          target_type?: string
          title: string
          type?: Database["public"]["Enums"]["ticket_type"]
          updated_at?: string
        }
        Update: {
          apartment_id?: string
          category_id?: string | null
          created_at?: string
          description?: string | null
          email_override?: string | null
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["ticket_priority"]
          property_id?: string | null
          recurrence_months?: number | null
          recurrence_note?: string | null
          recurrence_source_id?: string | null
          send_email?: boolean
          status?: Database["public"]["Enums"]["ticket_status"]
          target_type?: string
          title?: string
          type?: Database["public"]["Enums"]["ticket_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ticket_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      timed_notices: {
        Row: {
          content_de: string | null
          content_en: string | null
          content_es: string | null
          content_fi: string | null
          content_fr: string | null
          content_nl: string | null
          content_sv: string | null
          created_at: string
          expires_at: string
          id: string
          is_active: boolean
          starts_at: string
          style: string
          target_pages: string[]
          title: string
        }
        Insert: {
          content_de?: string | null
          content_en?: string | null
          content_es?: string | null
          content_fi?: string | null
          content_fr?: string | null
          content_nl?: string | null
          content_sv?: string | null
          created_at?: string
          expires_at: string
          id?: string
          is_active?: boolean
          starts_at?: string
          style?: string
          target_pages?: string[]
          title: string
        }
        Update: {
          content_de?: string | null
          content_en?: string | null
          content_es?: string | null
          content_fi?: string | null
          content_fr?: string | null
          content_nl?: string | null
          content_sv?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          is_active?: boolean
          starts_at?: string
          style?: string
          target_pages?: string[]
          title?: string
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
      ticket_priority: "1" | "2"
      ticket_status: "open" | "in_progress" | "resolved"
      ticket_type: "seasonal" | "urgent"
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
      ticket_priority: ["1", "2"],
      ticket_status: ["open", "in_progress", "resolved"],
      ticket_type: ["seasonal", "urgent"],
    },
  },
} as const

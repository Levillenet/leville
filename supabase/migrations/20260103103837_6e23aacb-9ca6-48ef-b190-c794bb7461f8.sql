-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'super_admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create admin_invitations table
CREATE TABLE public.admin_invitations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    invited_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    expires_at timestamptz DEFAULT (now() + interval '7 days'),
    used_at timestamptz
);

-- Enable RLS on admin_invitations
ALTER TABLE public.admin_invitations ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Function to check if user is any admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role IN ('admin', 'super_admin')
    )
$$;

-- RLS policies for user_roles
CREATE POLICY "Super admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Users can view their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Only backend can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only backend can update roles"
ON public.user_roles
FOR UPDATE
USING (false)
WITH CHECK (false);

CREATE POLICY "Only backend can delete roles"
ON public.user_roles
FOR DELETE
USING (false);

-- RLS policies for admin_invitations
CREATE POLICY "Super admins can view all invitations"
ON public.admin_invitations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Only backend can insert invitations"
ON public.admin_invitations
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only backend can update invitations"
ON public.admin_invitations
FOR UPDATE
USING (false)
WITH CHECK (false);

CREATE POLICY "Only backend can delete invitations"
ON public.admin_invitations
FOR DELETE
USING (false);
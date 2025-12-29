-- Create download_logs table for tracking PDF downloads
CREATE TABLE public.download_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_type TEXT NOT NULL CHECK (document_type IN ('welcome_letter', 'sauna_instructions')),
    downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    user_agent TEXT,
    language TEXT CHECK (language IN ('fi', 'en'))
);

-- Enable Row Level Security
ALTER TABLE public.download_logs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (log downloads)
CREATE POLICY "Anyone can log downloads"
ON public.download_logs
FOR INSERT
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_download_logs_document_type ON public.download_logs(document_type);
CREATE INDEX idx_download_logs_downloaded_at ON public.download_logs(downloaded_at DESC);
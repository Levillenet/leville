
-- Allow anyone to upload images to guide-images bucket
CREATE POLICY "Anyone can upload guide images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'guide-images');

-- Allow anyone to update guide images
CREATE POLICY "Anyone can update guide images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'guide-images');

-- Allow anyone to delete guide images
CREATE POLICY "Anyone can delete guide images"
ON storage.objects FOR DELETE
USING (bucket_id = 'guide-images');

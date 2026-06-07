-- 1. Make the 'resumes' bucket public so that public URLs work correctly
UPDATE storage.buckets 
SET public = true 
WHERE id = 'resumes';

-- 2. Ensure public users (anyone with the URL) can actually read/download the objects
CREATE POLICY "Public can view resumes" 
ON storage.objects FOR SELECT 
TO public 
USING ( bucket_id = 'resumes' );

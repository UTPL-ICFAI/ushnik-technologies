    -- Enable public uploads to the 'resumes' bucket
    CREATE POLICY "Public can upload resumes" 
    ON storage.objects FOR INSERT 
    TO public 
    WITH CHECK ( bucket_id = 'resumes' );

    -- Enable public to update their own uploads (often needed for chunked uploads)
    CREATE POLICY "Public can update resumes" 
    ON storage.objects FOR UPDATE 
    TO public 
    USING ( bucket_id = 'resumes' );

    -- Enable authenticated admin users to read resumes
    CREATE POLICY "Authenticated users can read resumes" 
    ON storage.objects FOR SELECT 
    TO authenticated 
    USING ( bucket_id = 'resumes' );

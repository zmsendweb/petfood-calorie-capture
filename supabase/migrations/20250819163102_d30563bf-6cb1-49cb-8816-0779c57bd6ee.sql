
-- Create a public table for breed images that everyone can read
CREATE TABLE public.breed_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  breed_name TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  generated_by TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but make it publicly readable
ALTER TABLE public.breed_images ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read breed images (no authentication required)
CREATE POLICY "Anyone can view breed images" 
  ON public.breed_images 
  FOR SELECT 
  TO public
  USING (true);

-- Allow authenticated users to insert/update breed images
CREATE POLICY "Authenticated users can manage breed images" 
  ON public.breed_images 
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_breed_images_breed_name ON public.breed_images(breed_name);

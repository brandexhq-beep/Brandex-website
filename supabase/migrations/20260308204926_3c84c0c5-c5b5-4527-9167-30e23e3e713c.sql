
CREATE TABLE public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text DEFAULT '',
  budget text DEFAULT '',
  description text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public form)
CREATE POLICY "Anyone can submit inquiries" ON public.contact_inquiries
  FOR INSERT WITH CHECK (true);

-- Only admins can read
CREATE POLICY "Admins can read inquiries" ON public.contact_inquiries
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

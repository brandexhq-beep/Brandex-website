
-- Allow admins to delete contact inquiries
CREATE POLICY "Admins can manage inquiries" ON public.contact_inquiries
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Fix blog_posts policies
DROP POLICY IF EXISTS "Admins can manage posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can read published posts" ON public.blog_posts;

CREATE POLICY "Anyone can read published posts"
ON public.blog_posts FOR SELECT TO anon, authenticated
USING (published = true);

CREATE POLICY "Admins can manage posts"
ON public.blog_posts FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Fix case_studies policies
DROP POLICY IF EXISTS "Admins can manage case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Anyone can read published case studies" ON public.case_studies;

CREATE POLICY "Anyone can read published case studies"
ON public.case_studies FOR SELECT TO anon, authenticated
USING (published = true);

CREATE POLICY "Admins can manage case studies"
ON public.case_studies FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Fix pricing_plans policies
DROP POLICY IF EXISTS "Admins can manage pricing" ON public.pricing_plans;
DROP POLICY IF EXISTS "Anyone can read pricing" ON public.pricing_plans;

CREATE POLICY "Anyone can read pricing"
ON public.pricing_plans FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage pricing"
ON public.pricing_plans FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Fix team_members policies
DROP POLICY IF EXISTS "Admins can manage team members" ON public.team_members;
DROP POLICY IF EXISTS "Anyone can read team members" ON public.team_members;

CREATE POLICY "Anyone can read team members"
ON public.team_members FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage team members"
ON public.team_members FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Fix testimonials policies
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can read published testimonials" ON public.testimonials;

CREATE POLICY "Anyone can read published testimonials"
ON public.testimonials FOR SELECT TO anon, authenticated
USING (published = true);

CREATE POLICY "Admins can manage testimonials"
ON public.testimonials FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Fix profiles policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can read own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = id);
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatbotWidget from "@/components/chat/ChatbotWidget";
import { createClient } from "@/utils/supabase/server";
import { AnimationProvider } from "@/components/animations/AnimationProvider";
import { PageTransitionWrapper } from "@/components/animations/PageTransitionWrapper";
import GlobalLoader from "@/components/animations/GlobalLoader";

export default async function MainLayout({ children }) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('global_settings').select('*').single();

  return (
    <AnimationProvider settings={settings}>
      <GlobalLoader />
      <Navbar />
      <PageTransitionWrapper>
        {children}
      </PageTransitionWrapper>
      <Footer />
      <ChatbotWidget />
    </AnimationProvider>
  );
}

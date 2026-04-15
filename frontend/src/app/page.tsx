import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import {
  Package,
  Users,
  ShoppingCart,
  FileText,
  TrendingUp,
  Shield,
  Globe,
  Zap,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Package,
    title: "إدارة المخزون",
    description: "تتبع المخزون والمنتجات والمستودعات بكل سهولة",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Users,
    title: "إدارة العملاء",
    description: "نظام CRM متكامل لإدارة علاقات العملاء",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: ShoppingCart,
    title: "المبيعات والمشتريات",
    description: "إدارة دورة المبيعات والمشتريات بشكل كامل",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    icon: FileText,
    title: "المحاسبة والتقارير",
    description: "تقارير مالية ومحاسبية شاملة ومحدثة",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    icon: Shield,
    title: "الأمان والحماية",
    description: "حماية البيانات والصلاحيات على أعلى مستوى",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/30",
  },
  {
    icon: Zap,
    title: "العمل دون اتصال",
    description: "استمر في العمل حتى بدون إنترنت وتزامن تلقائي",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
];

const stats = [
  { value: "+١٠٠٠", label: "شركة تثق بنا" },
  { value: "+٥٠,٠٠٠", label: "معاملة شهرياً" },
  { value: "٩٩.٩٪", label: "وقت التشغيل" },
  { value: "٢٤/٧", label: "دعم فني" },
];

const benefits = [
  "واجهة عربية بالكامل مع دعم RTL",
  "نظام محاسبي متوافق مع المعايير السورية",
  "تقارير ولوحات معلومات تفاعلية",
  "نقطة بيع متكاملة (POS)",
  "إدارة متعددة للمستودعات والفروع",
  "تكامل كامل بين جميع الوحدات",
];

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,hsl(var(--background)))]" />
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80"
            alt="Business dashboard background"
            fill
            className="object-cover opacity-10 dark:opacity-5"
            priority
          />
        </div>

        <div className="container relative mx-auto px-4 py-24 sm:py-32 lg:py-40">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-right">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-muted-foreground">نظام ERP متكامل للمؤسسات السورية</span>
              </div>

              {/* Main heading */}
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                أدر أعمالك بـ{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  ذكاء وكفاءة
                </span>
              </h1>

              {/* Description */}
              <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground sm:text-xl lg:mx-0">
                نظام تخطيط موارد المؤسسات المصمم خصيصاً للشركات السورية. محاسبة، مخزون، مبيعات، وعملاء - كل ما تحتاجه في مكان واحد.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                    ابدأ الآن
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                    إنشاء حساب مجاني
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 to-blue-500/5 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                  alt="ERP Dashboard"
                  fill
                  className="object-cover p-4"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              {/* Floating elements */}
              <div className="absolute -bottom-6 -right-6 rounded-xl border bg-card p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-500/10 p-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">نمو المبيعات</p>
                    <p className="text-lg font-bold">+٤٥٪</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 rounded-xl border bg-card p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">عملاء جدد</p>
                    <p className="text-lg font-bold">+١٢٣</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
        <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-blue-500/10 to-transparent blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="border-y bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 sm:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            كل ما تحتاجه لإدارة أعمالك
          </h2>
          <p className="text-lg text-muted-foreground">
            وحدات متكاملة تعمل معاً بسلاسة لتوفير تجربة إدارة شاملة
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-xl border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className={`mb-4 inline-flex rounded-lg p-3 ${feature.bg}`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-muted/30 py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              {/* Left: Description */}
              <div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  لماذا تختار نظامنا؟
                </h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  صُمم خصيصاً لتلبية احتياجات السوق السوري مع التركيز على البساطة والكفاءة
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                      <span className="text-sm sm:text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Visual */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 to-blue-500/5">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
                  alt="Modern office technology"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl border bg-card/90 p-8 text-center backdrop-blur">
                    <Globe className="mx-auto mb-4 h-16 w-16 text-primary" />
                    <p className="text-sm font-medium">نظام سحابي متكامل</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      يعمل في أي وقت ومن أي مكان
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="container mx-auto px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-card to-muted/20 p-8 text-center shadow-xl sm:p-12 lg:p-16">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
                alt="Background pattern"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative">
              <TrendingUp className="mx-auto mb-6 h-12 w-12 text-primary" />
              <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
                جاهز لبدء رحلة التحول الرقمي؟
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-muted-foreground sm:text-lg">
                انضم إلى آلاف الشركات السورية التي تثق بنظامنا لإدارة أعمالها
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                    ابدأ مجاناً الآن
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                لا حاجة لبطاقة ائتمان • إلغاء في أي وقت
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-sm text-muted-foreground sm:text-right">
              © ٢٠٢٦ نظام ERP السوري. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">
                سياسة الخصوصية
              </Link>
              <Link href="#" className="hover:text-foreground">
                شروط الاستخدام
              </Link>
              <Link href="#" className="hover:text-foreground">
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

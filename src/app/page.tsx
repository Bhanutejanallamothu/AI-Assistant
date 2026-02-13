import Link from 'next/link';
import {
  Bot,
  ChevronRight,
  ClipboardList,
  Cog,
  Contact,
  Rocket,
  ShieldCheck,
  Ticket,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';

const features = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Troubleshooting',
    description:
      'Automatically understand issues, suggest fixes, and guide users step-by-step using intelligent diagnostics.',
  },
  {
    icon: <Ticket className="h-8 w-8 text-primary" />,
    title: 'Smart Ticket Management',
    description:
      'Create, track, prioritize, and resolve service tickets with real-time status and AI categorization.',
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: 'Field Technician Dispatch',
    description:
      'Assign technicians instantly based on skill, availability, and location with automated scheduling.',
  },
  {
    icon: <Contact className="h-8 w-8 text-primary" />,
    title: 'Real-Time Communication',
    description:
      'Seamless chat between customers, agents, technicians, and AI assistant in one unified workspace.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Service Analytics',
    description:
      'Monitor performance, resolution time, technician efficiency, and customer satisfaction.',
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: 'Scalable Cloud Platform',
    description:
      'Secure, fast, and scalable infrastructure powered by Firebase and modern cloud technologies.',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Customer Reports Issue',
    description:
      'Submit a support request with description, images, and location.',
  },
  {
    step: 2,
    title: 'AI Analyzes Problem',
    description:
      'AI categorizes, prioritizes, and suggests solutions instantly.',
  },
  {
    step: 3,
    title: 'Technician Assigned',
    description: 'System dispatches the best technician automatically.',
  },
  {
    step: 4,
    title: 'Issue Resolved',
    description:
      'Technician completes service and updates report in real time.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block">
              ServicePulse AI
            </span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
              Intelligent AI Assistant for Tech Support & Field Service
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Automate support, resolve issues faster, and manage field
              technicians effortlessly with AI-powered service intelligence.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/login">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Request Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-muted py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="scroll-m-20 text-3xl font-bold tracking-tight font-headline">
                Powerful Features for Modern Service Teams
              </h2>
              <p className="mt-4 text-muted-foreground">
                Everything you need to streamline your support and field service
                operations.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline pt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="scroll-m-20 text-3xl font-bold tracking-tight font-headline">
                A Smarter Workflow in 4 Simple Steps
              </h2>
              <p className="mt-4 text-muted-foreground">
                From problem to resolution, our AI-driven process is designed
                for maximum efficiency.
              </p>
            </div>
            <div className="relative mt-16">
              <div
                className="absolute left-1/2 top-4 hidden h-full w-px -translate-x-1/2 bg-border md:block"
                aria-hidden="true"
              ></div>
              <div className="grid gap-8 md:grid-cols-4">
                {howItWorks.map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="font-bold">{item.step}</span>
                    </div>
                    <h3 className="mt-6 font-headline text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="bg-muted py-20">
          <div className="container text-center">
            <h2 className="scroll-m-20 text-3xl font-bold tracking-tight font-headline">
              Transform Your Technical Support Operations
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ready to see the future of field service? Get started with
              ServicePulse AI today.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/login">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <Logo />
            <p className="text-sm font-medium">
              © {new Date().getFullYear()} ServicePulse AI
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Secure, intelligent service management.
          </p>
        </div>
      </footer>
    </div>
  );
}

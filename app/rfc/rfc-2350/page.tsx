import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function RFC1() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 bg-linear-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 animate-in fade-in zoom-in duration-500">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              RFC - 2350
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Dokumentasi RFC versi pertama untuk standar dan protokol keamanan siber
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Card className="border-2 shadow-lg p-0">
              <CardContent className="p-0">
                <div className="w-full h-200 rounded-lg overflow-hidden">
                  <iframe
                    src="/rfc/rfc-2350.pdf"
                    className="w-full h-full"
                    title="RFC 2350"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


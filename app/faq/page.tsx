import Image from "next/image"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MessageCircleQuestion } from "lucide-react"
import { faqs } from "@/data/data"

export default function FAQ() {

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 bg-linear-to-br from-primary/10 via-blue-500/5 to-primary/15 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(35,165,90,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-blue-500/20 mb-6 animate-in fade-in zoom-in duration-500 shadow-lg shadow-primary/20">
              <MessageCircleQuestion className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent pb-1">
              FAQ
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan dan operasional CSIRT
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Kolom Pertama - Gambar */}
              <div className="relative h-125 sm:h-150">
                <Image
                  src="/faq.webp"
                  alt="FAQ"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Kolom Kedua - FAQ Accordion */}
              <div>
                <Accordion type="single" collapsible className="w-full space-y-3 h-fit">
                  {faqs.map((faq, index) => {
                    const colorClasses = [
                      "border-primary/30 hover:border-primary/50 hover:bg-primary/5",
                      "border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/5",
                      "border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/5",
                      "border-pink-500/30 hover:border-pink-500/50 hover:bg-pink-500/5",
                      "border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/5",
                      "border-primary/30 hover:border-primary/50 hover:bg-primary/5",
                      "border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/5",
                      "border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/5",
                    ]
                    return (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className={`border-2 rounded-xl px-5 ${colorClasses[index % colorClasses.length]} transition-all duration-300 hover:shadow-lg`}
                      >
                        <AccordionTrigger className="text-left font-semibold text-base py-4 hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


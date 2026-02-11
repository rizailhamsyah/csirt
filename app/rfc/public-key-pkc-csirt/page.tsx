import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Key } from "lucide-react"

export default function PublicKeyPKCCSIRT() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-linear-to-br from-purple-400/20 via-blue-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-linear-to-br from-blue-400/20 via-purple-400/20 to-transparent rounded-full blur-3xl" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-purple-500/20 mb-6 animate-in fade-in zoom-in duration-500 shadow-lg shadow-primary/20">
              <Key className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 tracking-tight text-purple-600 uppercase">
              PUBLIC KEY PKC CSIRT
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              Unduh dokumen Public Key PKC CSIRT
            </p>
            <a 
              href="/CSIRT-Pupuk Kujang_pkc.csirt@pupuk-kujang.co.id-0x296280B4D92E82F7-pub.asc" 
              download
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium px-8 py-4 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 bg-linear-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white cursor-pointer"
            >
              Download Dokumen
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

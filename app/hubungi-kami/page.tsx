import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import { kontakEmail, kontakTelepon, kontakAlamat, kontakMaps } from "@/data/data"

export default function HubungiKami() {
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
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent pb-1">
              Hubungi Kami
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Kami siap membantu Anda. Hubungi kami melalui berbagai saluran komunikasi yang tersedia
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Kolom Pertama - Informasi Kontak */}
              <div className="space-y-6">
                <Card className="border-2 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:border-primary/30 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-linear-to-br from-primary/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold">Email</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    {kontakEmail.map((item, index) => (
                      <div key={index}>
                        <p className="text-sm font-semibold text-muted-foreground mb-1.5">{item.label}</p>
                        <a
                          href={item.href}
                          className="text-base text-primary hover:underline font-medium transition-colors"
                        >
                          {item.email}
                        </a>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:border-blue-500/30 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-linear-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl font-bold">Telepon</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    {kontakTelepon.map((item, index) => (
                      <div key={index}>
                        <p className="text-sm font-semibold text-muted-foreground mb-1.5">{item.label}</p>
                        <a
                          href={item.href}
                          className="text-base text-blue-600 hover:underline font-medium transition-colors"
                        >
                          {item.nomor}
                        </a>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:border-purple-500/30 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <MapPin className="w-5 h-5 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl font-bold">Alamat</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {kontakAlamat.alamat.map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < kontakAlamat.alamat.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Kolom Kedua - Google Maps */}
              <div>
                <Card className="border-2 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 h-full overflow-hidden relative group">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="pb-4 relative z-10">
                    <CardTitle className="text-xl font-bold bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      Lokasi Kami
                    </CardTitle>
                    <CardDescription className="text-base">
                      Kunjungi kantor kami atau lihat di peta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="w-full h-150 rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg">
                      <iframe
                        src={kontakMaps.src}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={kontakMaps.title}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


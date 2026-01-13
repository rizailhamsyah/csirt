import Image from "next/image"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Target } from "lucide-react"
import { layananTentangKami } from "@/data/data"
import { ImageZoom } from "@/components/kibo-ui/image-zoom"
import { cn } from "@/lib/utils"

export default function TentangKami() {

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
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent pb-1">
              Tentang Kami
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              CSIRT adalah tim profesional yang berdedikasi untuk melindungi infrastruktur digital
              dan memberikan layanan keamanan siber terbaik
            </p>
          </div>
        </div>
      </section>

      {/* Deskripsi Singkat */}
      <section className="py-24 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                PKC - CSIRT
              </h2>
              <div className="h-1.5 w-24 bg-linear-to-r from-primary via-blue-500 to-purple-500 rounded-full mx-auto mb-8" />
            </div>
            <div className="space-y-6 text-muted-foreground text-base sm:text-lg leading-relaxed">
              <p className="text-center sm:text-left">
                Computer Security Incident Response Team (CSIRT) adalah unit khusus yang
                bertanggung jawab untuk menangani insiden keamanan siber, melakukan analisis
                ancaman, dan memberikan dukungan keamanan kepada organisasi.
              </p>
              <p className="text-center sm:text-left">
                Tim kami terdiri dari para ahli keamanan siber yang berpengalaman dalam berbagai
                aspek keamanan informasi, mulai dari incident response, threat intelligence,
                security assessment, hingga security awareness.
              </p>
              <p className="text-center sm:text-left">
                Dengan pendekatan proaktif dan reaktif, kami berkomitmen untuk melindungi
                infrastruktur digital dari berbagai ancaman siber yang terus berkembang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-20 sm:py-24 bg-linear-to-b from-muted/30 via-background to-blue-50/20 dark:to-blue-950/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Visi & Misi
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Komitmen kami untuk keamanan siber yang lebih baik
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-2 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:border-primary/30 group overflow-hidden relative">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-5 relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-linear-to-br from-primary/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Visi</CardTitle>
                  </div>
                  <div className="h-1.5 w-20 bg-linear-to-r from-primary to-blue-500 rounded-full" />
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed">
                    Menjadi pusat keunggulan dalam penanganan insiden keamanan siber dan
                    perlindungan infrastruktur digital nasional yang terpercaya dan profesional.
                    Kami bercita-cita untuk menjadi referensi utama dalam bidang keamanan siber di
                    tingkat regional dan internasional.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:border-purple-500/30 group overflow-hidden relative">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-5 relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Misi</CardTitle>
                  </div>
                  <div className="h-1.5 w-20 bg-linear-to-r from-purple-500 to-pink-500 rounded-full" />
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="list-none space-y-4 text-muted-foreground text-base leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 shrink-0 font-bold">•</span>
                      <span>Menyediakan layanan respons insiden keamanan siber yang cepat, efektif, dan profesional</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1.5 shrink-0 font-bold">•</span>
                      <span>Meningkatkan kesadaran keamanan siber melalui program edukasi dan pelatihan yang komprehensif</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1.5 shrink-0 font-bold">•</span>
                      <span>Mengembangkan kapasitas dan kemampuan dalam bidang keamanan siber melalui penelitian dan pengembangan</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 shrink-0 font-bold">•</span>
                      <span>Berpartisipasi aktif dalam komunitas keamanan siber global untuk berbagi pengetahuan dan pengalaman</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">Struktur Organisasi</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Tim profesional yang berdedikasi untuk keamanan siber
              </p>
            </div>
            <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
              <ImageZoom
                backdropClassName={cn(
                  '[&_[data-rmiz-modal-overlay="visible"]]:bg-black/80'
                )}
              >
                <Image
                  src="/organization_hitam.png"
                  alt="Struktur Organisasi"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain block dark:hidden"
                  unoptimized
                  priority
                />
              </ImageZoom>

              <ImageZoom
                backdropClassName={cn(
                  '[&_[data-rmiz-modal-overlay="visible"]]:bg-black/80'
                )}
              >
                <Image
                  src="/organization_putih.png"
                  alt="Struktur Organisasi"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain hidden dark:block"
                  unoptimized
                  priority
                />
              </ImageZoom>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section className="py-20 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">Layanan Kami</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Layanan keamanan siber komprehensif untuk melindungi organisasi Anda
              </p>
            </div>
            <div className="space-y-4">
              {layananTentangKami.map((item, index) => (
                <Card
                  key={index}
                  className="border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/30 group overflow-hidden relative p-0"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 p-6">
                    <div className="flex items-start gap-6">
                      <div className="shrink-0">
                        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110">
                          <item.icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl font-bold mb-1">{item.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {item.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


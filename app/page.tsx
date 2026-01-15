"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, Target } from "lucide-react"
import { Header } from "@/components/Header"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Meteors } from "@/components/ui/meteors"
import { Footer } from "@/components/Footer"
import { layanan, prinsipKeamanan, visiMisi } from "@/data/data"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-x-hidden">
        <Meteors number={30} />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-28">
            <div className="flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 overflow-visible pb-1">
                  PKC - CSIRT
                </h1>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                PKC - CSIRT merupakan tim Tanggap Insiden Keamanan Siber yang telah ditetapkan oleh Direksi PT Pupuk Kujang berdasarkan Keputusan Direksi Nomor 039/C/AP/D3220/SK/2025 pada 01 Desember 2025
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button asChild size="lg" className="text-base px-8 py-6 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300">
                  <Link href="/tentang-kami">Pelajari Lebih Lanjut</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300">
                  <Link href="/hubungi-kami">Hubungi Kami</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block order-first lg:order-last animate-in fade-in slide-in-from-right duration-700 overflow-visible">
              <div className="relative w-full h-full min-h-125 flex items-center justify-center">
                <Image
                  src="/cyber.png"
                  alt="Cyber Security"
                  width={800}
                  height={600}
                  className="object-contain w-full h-auto max-w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Kami Section */}
      <section className="py-24 sm:py-28 bg-linear-to-b from-muted/30 via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Layanan Kami
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Layanan keamanan siber komprehensif untuk melindungi organisasi Anda dari berbagai
              ancaman digital
            </p>
          </div>
          <div className="max-w-7xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {layanan.map((item, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full border-2 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 group overflow-hidden">
                      <div className={`absolute inset-0 bg-linear-to-br ${item.bgColor} opacity-0 transition-opacity duration-300`} />
                      <CardHeader className="relative z-10">
                        <div className={`mb-4 p-3 w-fit rounded-xl bg-linear-to-br ${item.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <item.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${item.iconColor}`} />
                        </div>
                        <CardTitle className="text-xl sm:text-2xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <CardDescription className="text-base leading-relaxed">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section className="py-24 sm:py-28 bg-linear-to-b from-background via-blue-50/30 dark:via-blue-950/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Visi & Misi
                </h2>
                <div className="h-1.5 w-24 bg-linear-to-r from-primary via-blue-500 to-purple-500 rounded-full" />
              </div>
              <div className="space-y-8 pt-4">
                <div className="space-y-3 p-6 rounded-2xl bg-linear-to-br from-primary/5 via-blue-500/5 to-transparent border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <h3 className="text-2xl font-semibold flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-linear-to-br from-primary/20 to-blue-500/20 shadow-lg">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    Visi
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed pl-12">
                    {visiMisi.visi}
                  </p>
                </div>
                <div className="space-y-3 p-6 rounded-2xl bg-linear-to-br from-purple-500/5 via-pink-500/5 to-transparent border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
                  <h3 className="text-2xl font-semibold flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 shadow-lg">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    Misi
                  </h3>
                  <ul className="list-none space-y-3 text-muted-foreground text-base leading-relaxed pl-12">
                    {visiMisi.misi.map((item, index) => {
                      const colors = ["text-primary", "text-blue-600", "text-purple-600"]
                      return (
                        <li key={index} className="flex items-start gap-3">
                          <span className={`${colors[index % colors.length]} mt-1.5 font-bold`}>•</span>
                          <span>{item}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative h-112.5 sm:h-137.5 rounded-2xl overflow-hidden flex items-center order-1 lg:order-2">
              <HeroVideoDialog
                className="block dark:hidden"
                animationStyle="top-in-bottom-out"
                videoSrc="https://www.youtube.com/embed/YKRvHFySR-8?si=0D9tlWjhc8EL9uiz"
                thumbnailSrc="/landing-thumbnail.jpg"
                thumbnailAlt="Hero Video"
              />
              <HeroVideoDialog
                className="hidden dark:block"
                animationStyle="top-in-bottom-out"
                videoSrc="https://www.youtube.com/embed/YKRvHFySR-8?si=0D9tlWjhc8EL9uiz"
                thumbnailSrc="/landing-thumbnail.jpg"
                thumbnailAlt="Hero Video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prinsip Keamanan Section */}
      <section className="py-24 sm:py-28 bg-linear-to-b from-muted/20 via-background to-purple-50/20 dark:to-purple-950/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight bg-linear-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prinsip Keamanan
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Prinsip-prinsip fundamental yang menjadi dasar dalam melindungi informasi dan sistem
              dari berbagai ancaman
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {prinsipKeamanan.map((prinsip, index) => {
              const colorClasses = [
                { dot: "bg-primary", border: "border-primary/30 hover:border-primary/50", bg: "from-primary/5 to-blue-500/5", shadow: "hover:shadow-primary/20" },
                { dot: "bg-blue-600", border: "border-blue-500/30 hover:border-blue-500/50", bg: "from-blue-500/5 to-purple-500/5", shadow: "hover:shadow-blue-500/20" },
                { dot: "bg-purple-600", border: "border-purple-500/30 hover:border-purple-500/50", bg: "from-purple-500/5 to-pink-500/5", shadow: "hover:shadow-purple-500/20" },
                { dot: "bg-pink-600", border: "border-pink-500/30 hover:border-pink-500/50", bg: "from-pink-500/5 to-red-500/5", shadow: "hover:shadow-pink-500/20" },
                { dot: "bg-emerald-600", border: "border-emerald-500/30 hover:border-emerald-500/50", bg: "from-emerald-500/5 to-primary/5", shadow: "hover:shadow-emerald-500/20" },
                { dot: "bg-primary", border: "border-primary/30 hover:border-primary/50", bg: "from-primary/5 to-blue-500/5", shadow: "hover:shadow-primary/20" },
              ]
              const color = colorClasses[index % colorClasses.length]
              return (
                <Card
                  key={index}
                  className={`h-full border-2 ${color.border} transition-all duration-300 hover:shadow-xl ${color.shadow} group overflow-hidden relative`}
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${color.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardHeader className="relative z-10">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-linear-to-b from-purple-400 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-white">{prinsip.number}</span>
                      </div>
                      <CardTitle className="text-xl text-center">{prinsip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base leading-relaxed">
                      {prinsip.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

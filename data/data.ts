import { 
  Shield, 
  Globe as Globes, 
  AlertTriangle, 
  Monitor, 
  FileText, 
  Search, 
  Code, 
  Mail, 
  Network, 
  BarChart, 
  MessageSquare, 
  Settings, 
  Users,
  LucideIcon 
} from "lucide-react"

export interface Layanan {
  icon: LucideIcon
  title: string
  description: string
  bgColor: string
  iconColor: string
}

export interface PrinsipKeamanan {
  number: number
  title: string
  description: string
}

export interface StrukturOrganisasi {
  posisi: string
  nama: string
  deskripsi: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface KontakEmail {
  label: string
  email: string
  href: string
}

export interface KontakTelepon {
  label: string
  nomor: string
  href: string
}

export interface KontakAlamat {
  alamat: string[]
}

export interface KontakMaps {
  src: string
  title: string
}

export interface VisiMisi {
  visi: string
  misi: string[]
}

export const layanan: Layanan[] = [
  {
    icon: Globes,
    title: "Pemberian Peringatan Terkait Keamanan Siber",
    description: "Layanan ini akan dilaksanakan oleh PKC-CSIRT yang berupa peringatan akan adanya ancaman siber kepada pemilik/penyelenggara sistem elektronik.",
    bgColor: "from-primary/20 via-blue-500/10 to-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Monitor,
    title: "Pengelolaan Insiden Siber",
    description: "Layanan pengelolaan insiden siber mencakup siklus penuh penanganan insiden keamanan siber pada sistem dan infrastruktur TI.",
    bgColor: "from-blue-500/20 via-purple-500/10 to-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    icon: FileText,
    title: "Penanganan Kerawanan Sistem Elektronik",
    description: "Layanan ini berupa koordinasi, analisis dan rekomendasi teknis dalam rangka penguatan aspek kendali keamanan (security control) baik dalam lingkungan teknis (Technology Security Control) ataupun non-teknis (Policy/Governance/Compliance).",
    bgColor: "from-purple-500/20 via-pink-500/10 to-purple-500/10",
    iconColor: "text-purple-600",
  },
  {
    icon: Code,
    title: "Penanganan Artefak Digital",
    description: "Layanan ini berupa penanganan artifak dalam rangka pemulihan sistem elektronik yang terdampak atau dukungan investigasi dalam rangka menjaga chain-of-custody dari sistem elektronik terdampak.",
    bgColor: "from-pink-500/20 via-red-500/10 to-pink-500/10",
    iconColor: "text-pink-600",
  },
  {
    icon: Mail,
    title: "Pemberitahuan Hasil Pengamatan Potensi Ancaman",
    description: "Layanan ini berupa notifikasi dan pemberitahuna kepada entitas lain akan adanya potensi yang serangan dan ancaman dari pihak luar yang berhasil terdeteksi.",
    bgColor: "from-primary/20 via-emerald-500/10 to-primary/10",
    iconColor: "text-emerald-600",
  },
  {
    icon: Network,
    title: "Pendeteksian Serangan",
    description: "Layanan ini berupa pendeteksian serangan siber pada konsitutuen yang akan dikorelasikan untuk memperkuat visibilitas secara keseluruhan.",
    bgColor: "from-blue-500/20 via-cyan-500/10 to-blue-500/10",
    iconColor: "text-cyan-600",
  },
  {
    icon: BarChart,
    title: "Analisis Risiko Keamanan Siber",
    description: "Layanan ini berupa assesmen dan analisa atas kondisi terkini kendali keamanan baik secara teknis dan non-teknis. Termasuk dalam analisa risiko keamanan informasi, audit teknis keamanan informasi, assesmen keamanan informasi.",
    bgColor: "from-indigo-500/20 via-purple-500/10 to-indigo-500/10",
    iconColor: "text-indigo-600",
  },
  {
    icon: MessageSquare,
    title: "Konsultasi Terkait Kesiapan Penanganan Insiden Siber (Security Advisory)",
    description: "Layanan ini berupa pendampingan dan pemberian konsultasi terkait proses penanganan insiden siber berdasarkan praktik terbaik industri dan regulasi yang berlaku.",
    bgColor: "from-teal-500/20 via-green-500/10 to-teal-500/10",
    iconColor: "text-teal-600",
  },
  {
    icon: Users,
    title: "Pembangunan Kesadaran dan Kepedulian Terhadap Keamanan Siber",
    description: "Layanan ini diberikan kepada konstituen dalam rangka membangun people-process-technology untuk menunjang program edukasi kesadaran keamanan informasi yang berkelanjutan.",
    bgColor: "from-orange-500/20 via-amber-500/10 to-orange-500/10",
    iconColor: "text-orange-600",
  },
]

export const prinsipKeamanan: PrinsipKeamanan[] = [
  {
    number: 1,
    title: "Control",
    description: "Pengendalian dan pengawasan terhadap akses serta penggunaan sistem dan data untuk memastikan keamanan informasi",
  },
  {
    number: 2,
    title: "Availability",
    description: "Memastikan sistem dan data dapat diakses kapan saja dibutuhkan oleh pihak yang berwenang tanpa gangguan",
  },
  {
    number: 3,
    title: "Confidentiality",
    description: "Memastikan informasi hanya dapat diakses oleh pihak yang berwenang dan tidak terungkap kepada pihak yang tidak berhak",
  },
  {
    number: 4,
    title: "Integrity",
    description: "Menjaga keakuratan, kelengkapan, dan konsistensi data serta metode pemrosesannya dari modifikasi yang tidak sah",
  },
]

export const strukturOrganisasi: StrukturOrganisasi[] = [
  {
    posisi: "Direktur",
    nama: "Dr. John Doe",
    deskripsi: "Memimpin tim CSIRT dan mengawasi strategi keamanan siber",
  },
  {
    posisi: "Manager Incident Response",
    nama: "Jane Smith",
    deskripsi: "Mengkoordinasikan penanganan insiden keamanan",
  },
  {
    posisi: "Security Analyst",
    nama: "Bob Johnson",
    deskripsi: "Menganalisis ancaman dan melakukan investigasi",
  },
  {
    posisi: "Security Engineer",
    nama: "Alice Williams",
    deskripsi: "Mengembangkan dan memelihara sistem keamanan",
  },
]

export const layananTentangKami: Layanan[] = [
  {
    icon: Globes,
    title: "Pemberian Peringatan Terkait Keamanan Siber",
    description:
      "Layanan ini akan dilaksanakan oleh -CSIRT yang berupa peringatan akan adanya ancaman siber kepada pemilik/penyelenggara sistem elektronik.",
    bgColor: "from-primary/20 via-blue-500/10 to-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Monitor,
    title: "Pengelolaan Insiden Siber",
    description:
      "Layanan pengelolaan insiden siber mencakup siklus penuh penanganan insiden keamanan siber pada sistem dan infrastruktur TI.",
    bgColor: "from-blue-500/20 via-purple-500/10 to-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    icon: FileText,
    title: "Penanganan Kerawanan Sistem Elektronik",
    description:
      "Layanan ini berupa koordinasi, analisis dan rekomendasi teknis dalam rangka penguatan aspek kendali keamanan (security control) baik dalam lingkungan teknis (Technology Security Control) ataupun non-teknis (Policy/Governance/Compliance).",
    bgColor: "from-purple-500/20 via-pink-500/10 to-purple-500/10",
    iconColor: "text-purple-600",
  },
  {
    icon: Code,
    title: "Penanganan Artefak Digital",
    description:
      "Layanan ini berupa penanganan artifak dalam rangka pemulihan sistem elektronik yang terdampak atau dukungan investigasi dalam rangka menjaga chain-of-custody dari sistem elektronik terdampak.",
    bgColor: "from-pink-500/20 via-red-500/10 to-pink-500/10",
    iconColor: "text-pink-600",
  },
  {
    icon: Mail,
    title: "Pemberitahuan Hasil Pengamatan Potensi Ancaman",
    description:
      "Layanan ini berupa notifikasi dan pemberitahuna kepada entitas lain akan adanya potensi yang serangan dan ancaman dari pihak luar yang berhasil terdeteksi.",
    bgColor: "from-primary/20 via-emerald-500/10 to-primary/10",
    iconColor: "text-emerald-600",
  },
  {
    icon: Network,
    title: "Pendeteksian Serangan",
    description:
      "Layanan ini berupa pendeteksian serangan siber pada konsitutuen yang akan dikorelasikan untuk memperkuat visibilitas secara keseluruhan.",
    bgColor: "from-blue-500/20 via-cyan-500/10 to-blue-500/10",
    iconColor: "text-cyan-600",
  },
  {
    icon: BarChart,
    title: "Analisis Risiko Keamanan Siber",
    description:
      "Layanan ini berupa assesmen dan analisa atas kondisi terkini kendali keamanan baik secara teknis dan non-teknis. Termasuk dalam analisa risiko keamanan informasi, audit teknis keamanan informasi, assesmen keamanan informasi.",
    bgColor: "from-indigo-500/20 via-purple-500/10 to-indigo-500/10",
    iconColor: "text-indigo-600",
  },
  {
    icon: MessageSquare,
    title: "Konsultasi Terkait Kesiapan Penanganan Insiden Siber (Security Advisory)",
    description:
      "Layanan ini berupa pendampingan dan pemberian konsultasi terkait proses penanganan insiden siber berdasarkan praktik terbaik industri dan regulasi yang berlaku.",
    bgColor: "from-teal-500/20 via-green-500/10 to-teal-500/10",
    iconColor: "text-teal-600",
  },
  {
    icon: Users,
    title: "Pembangunan Kesadaran dan Kepedulian Terhadap Keamanan Siber",
    description:
      "Layanan ini diberikan kepada konstituen dalam rangka membangun people-process-technology untuk menunjang program edukasi kesadaran keamanan informasi yang berkelanjutan.",
    bgColor: "from-orange-500/20 via-amber-500/10 to-orange-500/10",
    iconColor: "text-orange-600",
  },
]

export const faqs: FAQ[] = [
  {
    question: "Apa itu CSIRT?",
    answer:
      "CSIRT (Computer Security Incident Response Team) adalah tim khusus yang bertanggung jawab untuk menangani insiden keamanan siber, melakukan analisis ancaman, dan memberikan dukungan keamanan kepada organisasi. Tim kami siap membantu dalam penanganan berbagai jenis insiden keamanan siber.",
  },
  {
    question: "Layanan apa saja yang disediakan oleh CSIRT?",
    answer:
      "Kami menyediakan berbagai layanan keamanan siber termasuk Incident Response, Security Assessment, Security Monitoring 24/7, Threat Intelligence, dan Security Awareness Training. Setiap layanan dirancang untuk memenuhi kebutuhan spesifik organisasi Anda.",
  },
  {
    question: "Bagaimana cara melaporkan insiden keamanan?",
    answer:
      "Anda dapat melaporkan insiden keamanan melalui berbagai saluran: email ke security@csirt.example.com, hotline 24/7, atau melalui portal online kami. Tim kami akan merespons segera setelah menerima laporan dan memulai proses investigasi.",
  },
  {
    question: "Berapa lama waktu respons untuk insiden keamanan?",
    answer:
      "Waktu respons kami bervariasi tergantung pada tingkat keparahan insiden. Untuk insiden kritis, kami berkomitmen untuk merespons dalam waktu kurang dari 1 jam. Insiden dengan prioritas tinggi akan ditangani dalam waktu 4 jam, sedangkan insiden dengan prioritas normal akan ditangani dalam waktu 24 jam.",
  },
  {
    question: "Apakah CSIRT menyediakan layanan konsultasi keamanan?",
    answer:
      "Ya, kami menyediakan layanan konsultasi keamanan yang mencakup security assessment, penetration testing, security architecture review, dan compliance audit. Tim konsultan kami akan membantu mengidentifikasi kerentanan dan memberikan rekomendasi untuk meningkatkan postur keamanan organisasi Anda.",
  },
  {
    question: "Bagaimana cara bergabung dengan program Security Awareness?",
    answer:
      "Anda dapat mendaftar untuk program Security Awareness melalui website kami atau menghubungi tim kami langsung. Program ini mencakup pelatihan reguler, simulasi phishing, dan materi edukasi yang dapat disesuaikan dengan kebutuhan organisasi Anda.",
  },
  {
    question: "Apakah data yang dilaporkan akan dijaga kerahasiaannya?",
    answer:
      "Ya, kami sangat menjaga kerahasiaan data dan informasi yang dilaporkan kepada kami. Semua informasi ditangani sesuai dengan standar keamanan dan privasi yang ketat. Kami memiliki kebijakan kerahasiaan yang jelas dan mematuhi semua regulasi yang berlaku terkait perlindungan data.",
  },
  {
    question: "Bagaimana CSIRT berkoordinasi dengan pihak berwenang?",
    answer:
      "Kami bekerja sama erat dengan berbagai pihak berwenang termasuk kepolisian, regulator, dan organisasi keamanan siber lainnya. Dalam kasus insiden yang memerlukan intervensi hukum, kami akan membantu proses koordinasi dan penyediaan bukti digital yang diperlukan.",
  },
]

export const kontakEmail: KontakEmail[] = [
  {
    label: "Konsultasi",
    email: "consult@csirt.example.com",
    href: "mailto:consult@csirt.example.com",
  },
  {
    label: "Umum",
    email: "info@csirt.example.com",
    href: "mailto:info@csirt.example.com",
  },
]

export const kontakTelepon: KontakTelepon[] = [
  {
    label: "Hotline 24/7",
    nomor: "+62 123 456 789",
    href: "tel:+62123456789",
  },
  {
    label: "Office",
    nomor: "+62 123 456 790",
    href: "tel:+62123456790",
  },
]

export const kontakAlamat: KontakAlamat = {
  alamat: [
    "Jalan Jendral Ahmad Yani No.39, Kalihurip, Kec. Cikampek, Karawang, Jawa Barat 41373",
  ],
}

export const kontakMaps: KontakMaps = {
  src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15859.44637156368!2d107.42036714646763!3d-6.411823044525593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69728cf55f1ddd%3A0xae715fd6bdd296a0!2sPT%20Pupuk%20Kujang!5e0!3m2!1sid!2sid!4v1767853350978!5m2!1sid!2sid",
  title: "Lokasi CSIRT",
}

export const visiMisi: VisiMisi = {
  visi: "Terwujudnya peningkatan pelayanan Teknologi Informasi dan Transformasi Digital melalui peningkatan keamanan siber yang responsif dan efektif",
  misi: [
    "Meningkatkan kapasitas dan kemampuan dalam praktik pencegahan, penanganan dan pemulihan insiden siber.",
    "Memberikan edukasi dan praktik akan kesadaran keamanan siber pada entitas yang terlibat pada kegiatan operasional dengan tujuan meningkatkan ketahanan siber.",
    "Membangun koordinasi, kerjasama dan kolaborasi dengan pihak terkait dalam rangka pengamanan siber terhadap layanan Teknologi Informasi.",
  ],
}


/* ============================================================
   Sobre Nós — Drudi e Almeida
   Design: Neoclassical Medical Luminance
   Navy (#2c3e50), Gold (#c9a961), cream backgrounds
   ============================================================ */
import { Link } from "wouter";
import { ArrowRight, Award, Users, Heart, Target, GraduationCap, Stethoscope, Globe } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import { IMAGES } from "@/lib/images";

const values = [
  { icon: Heart, title: "Cuidado Humanizado", desc: "Cada paciente é único. Oferecemos atendimento personalizado e acolhedor." },
  { icon: Award, title: "Excelência Técnica", desc: "Profissionais altamente qualificados e em constante atualização." },
  { icon: Target, title: "Tecnologia de Ponta", desc: "Investimos nos equipamentos mais modernos do mercado." },
  { icon: Users, title: "Acessibilidade", desc: "Nossos institutos existem para democratizar o acesso à saúde ocular." },
];

const doctors = [
  {
    name: "Dr. Fernando Macei Drudi",
    crm: "CRM-SP 139.300 | RQE 50.645",
    role: "Diretor Clínico",
    specialty: "Especialista em Catarata e Retina Cirúrgica",
    image: IMAGES.doctors.drFernando,
    institutes: ["Instituto da Catarata", "Instituto da Retina"],
    bio: `Médico oftalmologista com formação completa em subespecialidades de Catarata e Retina Cirúrgica pelo Hospital dos Servidores Público Estadual (HSPE). Atualmente atua como médico concursado do HSPE desde 2020, com foco no ensino prático de técnicas cirúrgicas para residentes e fellows.

Além da excelência clínica, o Dr. Fernando é um profissional dedicado ao impacto social na saúde ocular da população brasileira. Participou ativamente do Projeto Oftalmologia Humanitária na Amazônia, realizando cirurgias e distribuindo óculos para comunidades ribeirinhas de difícil acesso. Por essa contribuição, recebeu a condecoração "Amigo da Marinha", importante reconhecimento concedido pela Marinha do Brasil.

Co-fundador da Drudi e Almeida Oftalmologia, lidera a clínica com a missão de proporcionar acesso à oftalmologia de excelência para todos.`,
    highlights: [
      { icon: GraduationCap, text: "Subespecialidade em Catarata e Retina — HSPE" },
      { icon: Stethoscope, text: "Médico concursado do HSPE desde 2020" },
      { icon: Globe, text: "Condecoração 'Amigo da Marinha' — Projeto Amazônia" },
    ],
  },
  {
    name: "Dra. Priscilla Rodrigues de Almeida",
    crm: "CRM-SP 148.173",
    role: "Diretora Técnica",
    specialty: "Especialista em Segmento Anterior e Lentes de Contato",
    image: IMAGES.doctors.draPriscilla,
    institutes: ["Instituto do Ceratocone"],
    bio: `Construiu sua trajetória na oftalmologia a partir de uma formação sólida e vivência intensa em ambientes de alta complexidade. Formou-se em Medicina e realizou Residência em Oftalmologia pelo Hospital do Servidor Público do Estado de São Paulo (HSPE), onde atuou ativamente em atendimentos clínicos e cirúrgicos, realizando centenas de cirurgias de catarata e procedimentos para glaucoma.

Após a residência, aprofundou seus conhecimentos com Fellowship em Doenças Oculares Externas e Córnea Cirúrgica pela Escola Paulista de Medicina (EPM/UNIFESP), referência nacional em ensino e pesquisa, com atuação em cirurgias de córnea, acompanhamento de transplantes penetrantes e lamelares e manejo de doenças da superfície ocular.

Mantém participação constante em congressos nacionais e internacionais, cursos de atualização e produção científica, reforçando o compromisso com uma medicina baseada em evidência, técnica e segurança.`,
    highlights: [
      { icon: GraduationCap, text: "Fellowship em Córnea — EPM/UNIFESP" },
      { icon: Stethoscope, text: "Centenas de cirurgias de catarata e glaucoma" },
      { icon: Globe, text: "Congressos nacionais e internacionais" },
    ],
  },
  {
    name: "Dra. Maria Amélia Valladares de Melo",
    crm: "CRM-SP 199.188 | RQE 102.980",
    role: "Cirurgiã de Estrabismo",
    specialty: "Especialista em Estrabismo e Oftalmologia Pediátrica",
    image: IMAGES.doctors.draMariaAmelia,
    institutes: ["Instituto de Estrabismo"],
    bio: `Médica oftalmologista especializada em Estrabismo e Oftalmologia Pediátrica, a Dra. Maria Amélia dedica sua carreira ao diagnóstico e tratamento cirúrgico do desalinhamento ocular em crianças e adultos.

Com formação focada em estrabismo, atua como cirurgiã especializada na Drudi e Almeida, realizando procedimentos corretivos que vão além da estética — devolvendo funcionalidade visual, visão binocular e qualidade de vida aos pacientes. O estrabismo infantil, quando diagnosticado precocemente, pode ser tratado com resultados significativos, evitando complicações como a ambliopia (olho preguiçoso).

A Dra. Maria Amélia é reconhecida por sua abordagem acolhedora com pacientes pediátricos e suas famílias, tornando o processo de tratamento mais tranquilo e humanizado.`,
    highlights: [
      { icon: GraduationCap, text: "Especialização em Estrabismo" },
      { icon: Stethoscope, text: "Cirurgiã de Estrabismo — adultos e crianças" },
      { icon: Heart, text: "Atendimento pediátrico humanizado" },
    ],
  },
];

export default function SobreNos() {
  return (
    <>
      <InstitutoHero
        title="Sobre a Drudi e Almeida"
        subtitle="Tradição, inovação e compromisso com a saúde ocular de cada paciente."
        imageUrl={IMAGES.hero.main}
        breadcrumb="Sobre Nós"
      />

      {/* Missão */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <AnimateOnScroll>
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Nossa Missão</span>
              <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">
                Democratizar o Acesso à Oftalmologia de Excelência
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                A Drudi e Almeida Clínicas Oftalmológicas nasceu com o propósito de unir o que há de mais avançado em tecnologia oftalmológica com um atendimento verdadeiramente humanizado. Acreditamos que toda pessoa merece ter acesso a cuidados de saúde ocular de alta qualidade.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                Nossos 5 institutos especializados — Catarata, Ceratocone, Glaucoma, Retina e Estrabismo — foram criados para oferecer tratamento focado e aprofundado em cada uma dessas áreas, garantindo que nossos pacientes recebam o melhor cuidado possível.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Cada instituto conta com profissionais dedicados exclusivamente àquela especialidade, equipamentos de última geração e protocolos de tratamento atualizados com as mais recentes evidências científicas internacionais.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <img
                src={IMAGES.hero.doctorConsultation}
                alt="Equipe Drudi e Almeida em consulta"
                className="rounded-xl shadow-lg w-full aspect-[4/3] object-cover"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Nossos Pilares</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Nossos Valores</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimateOnScroll key={v.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-border/60 p-6 h-full text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display text-lg text-navy mb-2">{v.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CORPO CLÍNICO ====== */}
      <section className="section-padding" id="corpo-clinico">
        <div className="container">
          <AnimateOnScroll className="text-center mb-16">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Corpo Clínico</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">
              Conheça Nossos Especialistas
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">
              Profissionais com formação de excelência, experiência cirúrgica comprovada e compromisso com o cuidado humanizado em todas as etapas do tratamento.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="space-y-20">
            {doctors.map((doc, idx) => (
              <AnimateOnScroll key={doc.name}>
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${idx % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                  {/* Photo column */}
                  <div className={`lg:col-span-4 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative group">
                      {/* Gold accent border */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-gold/30 via-gold/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-full aspect-[3/4] object-cover object-top"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                        {/* Name overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <p className="font-display text-xl text-white">{doc.name}</p>
                          <p className="font-ui text-xs text-gold tracking-wide mt-1">{doc.crm}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio column */}
                  <div className={`lg:col-span-8 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                    {/* Role badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block bg-gold/10 text-gold font-ui text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                        {doc.role}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl text-navy mb-1">{doc.name}</h3>
                    <p className="font-ui text-sm text-gold font-semibold mb-5">{doc.specialty}</p>

                    {/* Institutes tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {doc.institutes.map((inst) => (
                        <span
                          key={inst}
                          className="inline-flex items-center gap-1.5 bg-navy/5 text-navy font-ui text-xs font-medium px-3 py-1.5 rounded-full"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          {inst}
                        </span>
                      ))}
                    </div>

                    {/* Bio text */}
                    <div className="space-y-3 mb-6">
                      {doc.bio.split("\n\n").map((paragraph, pIdx) => (
                        <p key={pIdx} className="font-body text-base text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {doc.highlights.map((h) => (
                        <div
                          key={h.text}
                          className="flex items-start gap-3 bg-cream/60 rounded-lg p-3 border border-gold/10"
                        >
                          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                            <h.icon className="w-4 h-4 text-gold" />
                          </div>
                          <p className="font-ui text-xs text-navy leading-snug">{h.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider between doctors */}
                {idx < doctors.length - 1 && (
                  <div className="mt-16 flex items-center gap-4">
                    <div className="flex-1 h-px bg-border" />
                    <div className="w-2 h-2 rounded-full bg-gold/40" />
                    <div className="flex-1 h-px bg-border" />
                  </div>
                )}
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy text-white">
        <div className="container text-center">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 block">Agende Sua Consulta</span>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Cuide da Sua Visão com Quem Entende
            </h2>
            <p className="font-body text-base text-white/70 max-w-lg mx-auto mb-8">
              Venha conhecer nossa clínica e descubra como nossos especialistas podem cuidar da sua saúde ocular.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-gold-light transition-colors"
              >
                Agendar pelo WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-white/10 transition-colors"
              >
                Nossas Unidades
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

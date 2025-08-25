import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Brain, Users, BookOpen, FileText, Calculator, Volume2, Star, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Bell, Calendar, AlertCircle, Instagram, Facebook } from 'lucide-react';

function App() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isNovostiOpen, setIsNovostiOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const galleryImages = [
    "261285886_101901722337460_8727073625305555739_n.png",
    "465048340_17999346404703360_6138185263007050199_n.png",
    "465999360_17999985332703360_3899139591720363224_n.png",
    "466924488_17999985344703360_7065325554612264519_n.png",
    "468785105_18002202800703360_2311163242906743360_n.png",
    "468845697_18002198069703360_5005956590350697634_n.png",
    "468851948_18002200295703360_2554506025071240358_n.png",
    "468854070_18002201855703360_3857389572739166689_n.png",
    "468882607_18002202758703360_6040174308756285653_n.png",
    "468962933_18002197820703360_7406695608828471542_n.png",
    "468969469_18002197973703360_7034050162865694351_n.png",
    "468973130_18002202737703360_2008248972366165195_n.png",
    "468976292_18002197718703360_8110146152735406266_n.png",
    "468985530_18002202725703360_616745104587068074_n.png",
    "469072584_590967760097518_7896693401430714207_n.png",
    "469233914_18002716571703360_8301379347774671399_n.png",
    "469357301_591171810077113_5529408227775467504_n.png",
    "469360444_590338416827119_2758804795856130479_n.png",
    "469361765_590977970096497_210542141274883608_n.png",
    "469362574_590968010097493_603515809483131154_n.png",
    "469364390_590977920096502_1667081492529593245_n.png",
    "469375095_591171783410449_5496210076181088649_n.png",
    "469403863_590977963429831_7997425805323390648_n.png",
    "469419623_590978253429802_412616660904285628_n.png",
    "469460729_590967723430855_8385103275294209305_n.png",
    "469461007_590959430098351_8399243888465767837_n.png",
    "469480658_591171786743782_5080747925782370503_n.png",
    "469485376_590978323429795_2888823592743584271_n.png",
    "469489557_591171790077115_3427546899853045477_n.png",
    "469518714_591609470033347_7192933211859666605_n.png",
    "469519281_590991336761827_314743731572623976_n.png",
    "469519670_590338396827121_6067601371557084394_n.png",
    "469522729_590978206763140_4347638036641621174_n.png",
    "469553987_591609466700014_4387556024187686989_n.png",
    "469593495_591609143366713_8296488464951926642_n.png",
    "469606115_591614386699522_4491599651775793834_n.png",
    "469606127_591598543367773_7028074371991930222_n.png",
    "469641167_590967780097516_1817324001573886142_n.png",
    "469685336_591626200031674_411700321727077737_n.png",
    "469696236_591171383410489_2524961368963449013_n.png",
    "469825584_592785039915790_7066210134996610588_n.png",
    "470196428_595854949608799_1700532260634762769_n.png",
    "470206348_595840339610260_4950839477671909329_n.png",
    "470214071_595827096278251_815013033603576384_n.png",
    "470215918_595840072943620_7395596054479446221_n.png",
    "470902350_18004417901703360_6041826412252396065_n.png",
    "472363774_610414698152824_1156647970725237363_n.png",
    "472413741_610414534819507_5321160532226262524_n.png",
    "472413741_610415398152754_4243478788209018826_n.png",
    "472527883_18007425062703360_4628361327984952353_n.png",
    "472577809_608241288399834_8396231022664614942_n.png",
    "472663981_608492715041358_1634115504200951310_n.png",
    "472714033_608492481708048_4093630520543514213_n.png",
    "472715778_608241468399816_2313990196946517475_n.png",
    "472716512_608492345041395_2543650869761712519_n.png",
    "472718896_607612518462711_3888460389363787624_n.png",
    "472723444_608492375041392_5267237418097915985_n.png",
    "472740753_608492508374712_6971495795654352166_n.png",
    "472743307_607609131796383_5795625327168865690_n.png",
    "472748165_607602225130407_3221736859570451195_n.png",
    "472776386_607612368462726_3965053031787271614_n.png",
    "472777819_607612318462731_1256767463616916715_n.png",
    "472788641_607602101797086_690165283461986209_n.png",
    "472790591_610414601486167_7928612388879456367_n.png",
    "472840023_607612498462713_2127980551750837414_n.png",
    "472843107_607619591795337_2813216432569108445_n.png",
    "472852227_608241261733170_2506988549439578522_n.png",
    "472854149_609155071641789_6002112457068222964_n.png",
    "472858216_609154991641797_4717486732760054892_n.png",
    "472865105_609156744974955_5151998740976078482_n.png",
    "472883040_607609135129716_8294138418044605449_n.png",
    "472892748_609154734975156_4301427710653728724_n.png",
    "472896530_18007425053703360_4867570396174950047_n.png",
    "472932259_609157191641577_1324224941965517174_n.png",
    "472966641_607607458463217_2959384679257357387_n.png",
    "473046364_610243118199651_4305410690873111172_n.png",
    "473064452_609156748308288_829454312970917631_n.png",
    "473064813_610243281532968_7274842750048233901_n.png",
    "473068297_610243191532977_277222264078016544_n.png",
    "473077585_608492678374695_944436251278799000_n.png",
    "473081217_610243254866304_2156405897922528980_n.png",
    "473117354_610243248199638_2921939530707754807_n.png",
    "473315293_610243221532974_2926969467504051518_n.png",
    "473320352_609665381590758_2389059396003834997_n.png",
    "473321787_610243271532969_7455450365822513019_n.png",
    "473348805_610243278199635_1246518229544027886_n.png",
    "474146461_617534317470531_2879196658347006714_n.png",
    "474463356_617534407470522_5093487057990011769_n.png",
    "474464860_617534397470523_6238329200893161972_n.png",
    "474473572_618091377414825_486573402068477953_n.png",
    "474474138_617534357470527_4838448124880417588_n.png",
    "474474604_618091410748155_6734750340606580144_n.png",
    "474495860_618091374081492_35804855533701992_n.png",
    "474503437_618091384081491_2693668168040995529_n.png",
    "474505006_618091397414823_6866378882777508888_n.png",
    "474509824_618078537416109_7125316319604127037_n.png",
    "474524438_618078547416108_2082000541070765325_n.png",
    "474526914_618088080748488_5332305799930986466_n.png",
    "474552691_618091420748154_6551203412485446136_n.png",
    "474571251_618078494082780_7949180235866030813_n.png",
    "474572497_618078607416102_5676539074107342051_n.png",
    "474592350_618087767415186_8186368120422338043_n.png",
    "474597476_617534334137196_8570059586399638105_n.png",
    "474631701_618091364081493_2523391547968383248_n.png",
    "474655670_618078617416101_2702113333597528698_n.png",
    "474662905_618091390748157_5865284875541444476_n.png",
    "474675937_618087897415173_1037207751645096314_n.png",
    "474793104_618091387414824_2184140581596744015_n.png",
    "474796807_618087817415181_8520289668100199151_n.png",
    "474802924_618087824081847_4321800869421755706_n.png",
    "475402515_623562466867716_7220699251676921768_n.png",
    "475529070_623562053534424_6953936491224717922_n.png",
    "475642847_623442823546347_247497896200292674_n.png",
    "475680620_623442836879679_7767980654097886704_n.png",
    "475766967_623562460201050_4210467825037689632_n.png",
    "475797455_623438693546760_7490323729807412470_n.png",
    "475830546_623442840213012_6585647425212058093_n.png",
    "475842759_623562350201061_8037713739391965353_n.png",
    "475875564_623562393534390_893079615128068059_n.png",
    "475895980_623442816879681_6493309422043061961_n.png"
  ];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 5));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else if (selectedImageIndex === 0) {
      setSelectedImageIndex(galleryImages.length - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else if (selectedImageIndex === galleryImages.length - 1) {
      setSelectedImageIndex(0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        switch (event.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            goToPrevious();
            break;
          case 'ArrowRight':
            goToNext();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImageIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden pt-20">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <Star className="absolute top-20 left-10 w-6 h-6 text-yellow-400 opacity-60" />
        <Star className="absolute top-32 left-32 w-4 h-4 text-yellow-500 opacity-40" />
        <Star className="absolute top-16 right-20 w-5 h-5 text-yellow-400 opacity-50" />
        <Star className="absolute top-40 right-40 w-3 h-3 text-yellow-500 opacity-60" />
        <Star className="absolute bottom-32 left-16 w-4 h-4 text-yellow-400 opacity-40" />
        <Star className="absolute bottom-20 right-32 w-5 h-5 text-yellow-500 opacity-50" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full opacity-20 -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400 rounded-full opacity-15 translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-200 rounded-full opacity-30"></div>
      </div>

      {/* Header - Fiksiran navbar koji ostaje na vrhu */}
      <header className="fixed top-0 left-0 right-0 bg-white/96 backdrop-blur-lg shadow-xl z-50 transition-all duration-300 border-b border-yellow-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-gray-800" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 tracking-wide">PRIČAONICA</h1>
                <p className="text-sm text-gray-600 font-medium">Logopedski kabinet</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#usluge" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Usluge</a>
              <a href="#o-nama" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">O nama</a>
              <button 
                onClick={() => setIsNovostiOpen(true)}
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium"
              >
                Novosti
              </button>
              <button 
                onClick={() => setIsGalleryOpen(true)}
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium"
              >
                Galerija
              </button>
              <a href="#kontakt" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Kontakt</a>
              
              {/* Social Media Links */}
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
                <a 
                  href="https://www.instagram.com/pricaonica_logopedski_kabinet/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-pink-600 transition-colors p-2 hover:bg-pink-50 rounded-full"
                  title="Instagram - @pricaonica_logopedski_kabinet"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/people/Pričaonica-logopedski-kabinet/100076419042758/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full"
                  title="Facebook - Pričaonica logopedski kabinet"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full opacity-30"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-400 rounded-full opacity-25"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200 rounded-full opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Decorative book illustration */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12">
                <BookOpen className="w-12 h-12 text-gray-800" />
              </div>
              <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500" />
              <Star className="absolute -bottom-1 -left-3 w-4 h-4 text-yellow-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 tracking-wide">
            Dobrodošli u Pričaonicu!
          </h1>
                     <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
             Naš tim pruža profesionalne usluge logopedske dijagnostike, terapije i savjetovanja 
             djece i odraslih osoba u toploj i poticajnoj atmosferi.
           </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#kontakt" 
              className="bg-yellow-500 text-gray-800 px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Zakažite pregled
            </a>
            <a 
              href="#usluge" 
              className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold border-2 border-yellow-400 hover:bg-yellow-50 transition-colors shadow-md"
            >
              Saznajte više
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="usluge" className="py-20 bg-white/80 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Naše usluge</h2>
                         <p className="text-gray-600 text-lg max-w-2xl mx-auto">
               Naš tim je specijaliziran za širok spektar logopedskih usluga prilagođenih potrebama svakog klijenta
             </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-yellow-200">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FileText className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Logopedska dijagnostika</h3>
              <p className="text-gray-600 leading-relaxed">
                Sveobuhvatan pregled i procjena govorno-jezičnih sposobnosti s detaljnim izvještajem i preporukama za daljnji tretman.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-yellow-200">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Brain className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Logopedska terapija</h3>
              <p className="text-gray-600 leading-relaxed">
                Individualizirane terapijske metode i vježbe prilagođene specifičnim potrebama svakog klijenta za optimalne rezultate.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-yellow-200">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Logopedsko savjetovanje</h3>
              <p className="text-gray-600 leading-relaxed">
                Stručno usmjeravanje roditelja, odgajatelja i učitelja s praktičnim savjetima za potporu razvoju komunikacije.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions We Treat */}
      <section className="py-20 bg-yellow-50/50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Teškoće koje tretiramo</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Bavimo se različitim govornim, jezičnim i komunikacijskim teškoćama
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <Volume2 className="w-5 h-5 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Teškoće izgovora</h4>
              </div>
              <p className="text-gray-600 text-sm">Artikulacijski poremećaji i problemi s izgovorom glasova</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <MessageCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Jezične teškoće</h4>
              </div>
              <p className="text-gray-600 text-sm">Problemi s razumijevanjem i korištenjem jezika</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <Brain className="w-5 h-5 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Mucanje</h4>
              </div>
              <p className="text-gray-600 text-sm">Teškoće s fluentnošću govora i kontrolom ritma</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <BookOpen className="w-5 h-5 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Teškoće čitanja</h4>
              </div>
              <p className="text-gray-600 text-sm">Disleksija i druge teškoće s razumijevanjem teksta</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Teškoće pisanja</h4>
              </div>
              <p className="text-gray-600 text-sm">Disgrafija i problemi s pisanim izražavanjem</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <Calculator className="w-5 h-5 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Teškoće računanja</h4>
              </div>
              <p className="text-gray-600 text-sm">Diskalkulija i matematičke teškoće</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-nama" className="py-20 bg-white/80 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">O nama</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Naš tim čine iskusne logopedinje koje su posvećene pružanju najbolje moguće skrbi 
                za govorno-jezični razvoj naših klijenata.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sara Biškup */}
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-8 rounded-3xl shadow-lg relative overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-4xl">👩🏼‍⚕️</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Sara Biškup</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Logoped s dugogodišnjim iskustvom u radu s djecom i odraslima. Specijalizirana je za 
                  različite govorno-jezične teškoće i komunikacijske poremećaje. Njen pristup temelji se 
                  na individualiziranoj procjeni potreba svakog klijenta i kreiranju prilagođenih 
                  terapijskih programa.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Stručno se usavršava u područjima artikulacijskih poremećaja, jezičnih teškoća 
                  i komunikacijskih vještina.
                </p>
                
                {/* Decorative elements */}
                <Star className="absolute top-4 right-6 w-5 h-5 text-yellow-500 opacity-60" />
                <Star className="absolute bottom-6 left-8 w-4 h-4 text-yellow-400 opacity-50" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300 rounded-full opacity-20 translate-x-12 -translate-y-12"></div>
              </div>

              {/* Lana Srednoselec */}
              <div className="bg-gradient-to-br from-orange-100 to-yellow-200 p-8 rounded-3xl shadow-lg relative overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-4xl">👩🏻‍⚕️</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Lana Srednoselec</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Logoped s posebnim interesom za rad s djecom predškolske i školske dobi. 
                  Specijalizirana je za teškoće čitanja i pisanja, kao i za poremećaje fluentnosti govora. 
                  Koristi kreativne i inovativne metode rada koje čine terapiju zanimljivom i učinkovitom.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Kontinuirano se educira o najnovijim pristupima u logopediji i primjenjuje 
                  suvremene terapijske tehnike.
                </p>
                
                {/* Decorative elements */}
                <Star className="absolute top-4 left-6 w-5 h-5 text-orange-500 opacity-60" />
                <Star className="absolute bottom-6 right-8 w-4 h-4 text-orange-400 opacity-50" />
                <div className="absolute top-0 left-0 w-24 h-24 bg-orange-300 rounded-full opacity-20 -translate-x-12 -translate-y-12"></div>
              </div>
            </div>

            {/* Team description */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-3xl border border-yellow-200 shadow-md">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Naš pristup</h4>
                <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  U Pričaonici stvaramo sigurno i poticajno okruženje gdje svaki klijent može 
                  razvijati svoje komunikacijske vještine uz profesionalnu podršku i razumijevanje. 
                  Naš tim radi zajedno kako bi pružio sveobuhvatan pristup svakom klijentu, 
                  kombinirajući različite stručnosti i iskustva za najbolje moguće rezultate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 bg-yellow-50/50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Kontaktirajte nas</h2>
            <p className="text-gray-600 text-lg">
              Rado ćemo odgovoriti na sva vaša pitanja i zakazati pregled
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Kontakt informacije</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Naš tim</h4>
                      <p className="text-gray-600">Sara Biškup</p>
                      <p className="text-gray-600">Lana Srednoselec</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Telefon</h4>
                      <a href="tel:+385998621196" className="text-yellow-600 hover:underline font-medium">
                        +385 99 8621196
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <a href="mailto:pricaonica.logoped@gmail.com" className="text-yellow-600 hover:underline font-medium">
                        pricaonica.logoped@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Adresa</h4>
                      <p className="text-gray-600">Racinova 8<br />Zagreb, Croatia</p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Pratite nas</h4>
                      <div className="flex items-center space-x-3 mt-2">
                        <a 
                          href="https://www.instagram.com/pricaonica_logopedski_kabinet/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                          <span className="text-sm">@pricaonica_logopedski_kabinet</span>
                        </a>
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <a 
                          href="https://www.facebook.com/people/Pričaonica-logopedski-kabinet/100076419042758/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Facebook className="w-5 h-5" />
                          <span className="text-sm">Pričaonica logopedski kabinet</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-8 rounded-3xl text-gray-800 shadow-lg relative overflow-hidden">
                <h3 className="text-xl font-semibold mb-6">Zakažite pregled</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Kontaktirajte nas telefonski ili putem e-maila za zakazivanje pregleda. 
                  Odgovorit ćemo u najkraćem mogućem roku i pronaći termin koji vam odgovara.
                </p>
                
                <div className="space-y-4">
                  <a 
                    href="tel:+385998621196" 
                    className="block w-full bg-white/30 hover:bg-white/50 text-gray-800 py-3 px-6 rounded-full font-bold text-center transition-colors shadow-md"
                  >
                    <Phone className="w-5 h-5 inline mr-2" />
                    Pozovite sada
                  </a>
                  
                  <a 
                    href="mailto:pricaonica.logoped@gmail.com?subject=Upit za logopedski pregled" 
                    className="block w-full bg-white/30 hover:bg-white/50 text-gray-800 py-3 px-6 rounded-full font-bold text-center transition-colors shadow-md"
                  >
                    <Mail className="w-5 h-5 inline mr-2" />
                    Pošaljite e-mail
                  </a>
                </div>
                
                {/* Decorative elements */}
                <Star className="absolute top-4 right-4 w-6 h-6 text-yellow-600 opacity-40" />
                <Star className="absolute bottom-4 left-4 w-4 h-4 text-yellow-600 opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <h4 className="font-bold text-lg">PRIČAONICA</h4>
                <p className="text-gray-400 text-sm">Logopedski kabinet</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2025 Pričaonica - Logopedski kabinet. Sva prava zadržana.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-yellow-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-yellow-200 bg-gradient-to-r from-yellow-50 to-white">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                  <BookOpen className="w-8 h-8 text-yellow-600 mr-3" />
                  Galerija
                </h2>
                <p className="text-gray-600 mt-1">Fotografije iz našeg rada i aktivnosti u Pričaonici</p>
              </div>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="p-3 hover:bg-yellow-100 rounded-full transition-all duration-300 hover:scale-110"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] bg-gradient-to-br from-yellow-25 to-white">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {galleryImages.map((imageName, index) => (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 cursor-pointer bg-gradient-to-br from-white to-yellow-50 border border-yellow-100"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="p-2">
                      <img
                        src={`/${imageName}`}
                        alt={`Galerija slika ${index + 1}`}
                        className="w-full h-32 md:h-40 object-cover group-hover:scale-110 transition-transform duration-500 rounded-xl"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      #{index + 1}
                    </div>
                    <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-yellow-400 transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Novosti Modal */}
      {isNovostiOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-yellow-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-yellow-200 bg-gradient-to-r from-yellow-50 to-white">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                  <FileText className="w-8 h-8 text-yellow-600 mr-3" />
                  Novosti
                </h2>
                <p className="text-gray-600 mt-1">Pratite najnovije vijesti i događanja iz našeg logopedskog kabineta</p>
              </div>
              <button
                onClick={() => setIsNovostiOpen(false)}
                className="p-3 hover:bg-yellow-100 rounded-full transition-all duration-300 hover:scale-110"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] bg-gradient-to-br from-yellow-25 to-white">
              {/* Novosti Section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <FileText className="w-6 h-6 text-yellow-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Novosti</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* News Item 1 */}
                <article className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-yellow-100">
                  <div className="h-48 bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-yellow-600" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-500 font-medium">15. siječanj 2025.</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Novi pristup u radu s djecom</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Uveli smo inovativne metode rada koje kombiniraju tradicionalne tehnike s modernim pristupima u logopediji.
                    </p>
                    <a href="#" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors">
                      Pročitaj više
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>

                {/* News Item 2 */}
                <article className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-yellow-100">
                  <div className="h-48 bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
                    <Users className="w-16 h-16 text-orange-600" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-500 font-medium">8. siječanj 2025.</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Radionica za roditelje</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Uspješno je održana radionica "Kako podržati govorni razvoj djeteta kod kuće" s velikim odazivom roditelja.
                    </p>
                    <a href="#" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors">
                      Pročitaj više
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>

                {/* News Item 3 */}
                <article className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-yellow-100">
                  <div className="h-48 bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
                    <Brain className="w-16 h-16 text-blue-600" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-500 font-medium">20. prosinac 2024.</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Nove terapijske igre</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Nabavili smo nova pomagala i terapijske igre koje čine rad s djecom još zanimljivijim i efikasnijim.
                    </p>
                    <a href="#" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition-colors">
                      Pročitaj više
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>
                </div>
              </div>

              {/* Obavijesti Section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Bell className="w-6 h-6 text-orange-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Obavijesti</h3>
                </div>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Notification 1 */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertCircle className="w-8 h-8 text-orange-600" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-orange-500 mr-2" />
                          <span className="text-sm text-orange-700 font-medium">Važno - 20. siječanj 2025.</span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Promjena radnog vremena</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Obavještavamo vas da će naš kabinet 25. siječnja biti zatvoren zbog stručnog usavršavanja. 
                          Molimo da termine prebukirate na drugi dan.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notification 2 */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Calendar className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                          <span className="text-sm text-blue-700 font-medium">10. siječanj 2025.</span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Nova online rezervacija</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Sada možete zakazati termine i putem naše web stranice! Jednostavno nas kontaktirajte 
                          putem kontakt forme ili telefona.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notification 3 */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Users className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm text-green-700 font-medium">5. siječanj 2025.</span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Grupne terapije</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Pokretamo nove grupne terapije za djecu predškolske dobi. 
                          Prijave su otvorene - kontaktirajte nas za više informacija.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notification 4 */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-purple-500 mr-2" />
                          <span className="text-sm text-purple-700 font-medium">1. siječanj 2025.</span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Besplatne konzultacije</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Tijekom mjeseca siječnja nudimo besplatne kratke konzultacije za nova pitanja 
                          vezana uz govorni razvoj djece.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="text-center mt-12">
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-3xl p-8 max-w-2xl mx-auto border border-yellow-300">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Želite biti obaviješteni o novostima?</h3>
                  <p className="text-gray-600 mb-6">
                    Kontaktirajte nas da biste saznali više o našim aktivnostima i novim uslugama.
                  </p>
                  <button 
                    onClick={() => {
                      setIsNovostiOpen(false);
                      document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-block bg-yellow-500 text-gray-800 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Kontaktirajte nas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image counter and zoom level */}
          <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
            {selectedImageIndex + 1} / {galleryImages.length} • {Math.round(zoomLevel * 100)}%
          </div>

          {/* Zoom controls */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
            <button
              onClick={zoomOut}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              disabled={zoomLevel <= 0.5}
            >
              <ZoomOut className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={resetZoom}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={zoomIn}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              disabled={zoomLevel >= 5}
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Previous button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Main image */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={`/${galleryImages[selectedImageIndex]}`}
              alt={`Galerija slika ${selectedImageIndex + 1}`}
              className="max-w-none shadow-2xl transition-transform duration-200"
              style={{ 
                imageRendering: 'high-quality',
                transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
              }}
              onMouseDown={handleMouseDown}
              onClick={(e) => {
                e.stopPropagation();
                if (zoomLevel === 1) {
                  zoomIn();
                }
              }}
              draggable={false}
            />
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeLightbox}
          />
        </div>
      )}
    </div>
  );
}

export default App;
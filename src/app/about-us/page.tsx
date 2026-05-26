"use client";

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-white font-['Nunito'] overflow-x-hidden">
      <div className="flex flex-col items-start self-stretch bg-[#FFF0E4] pb-[50px] md:pb-[72px] pt-[80px]">

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start self-stretch mb-3 px-4 md:px-0" style={{ background: "linear-gradient(180deg, #FFFAF4, #FFF3E0, #FFF0E4)" }}>
          <div className="flex-1 self-stretch hidden md:block" />
          <div className="flex flex-col shrink-0 items-start w-full md:w-auto">
            <button className="flex flex-col items-start bg-[#FFDBB8] text-left py-1.5 px-[17px] mb-5 rounded-[99px] border border-solid border-[#F0D5B8] mx-auto md:mx-0">
              <span className="text-[#D96F28] text-xs font-bold">Our story</span>
            </button>
            <div className="flex flex-col items-center mb-6 w-full">
              <span className="text-[#2C1A0E] text-[36px] md:text-[52px] font-black text-center w-full md:w-[413px] tracking-[-1px] leading-[44px] md:leading-[57px] px-4 md:px-0">
                Built by pet parents,<br />for every pet parent.
              </span>
            </div>
            <span className="text-[#6B3A1F] text-[15px] md:text-[17px] font-normal w-full md:w-[557px] mb-10 leading-relaxed text-center md:text-left px-4 md:px-0">
              Tailio was born out of a simple frustration — why is doing the right thing<br className="hidden md:block" /> for your pet so unnecessarily hard? We set out to fix that, one registration<br className="hidden md:block" /> at a time.
            </span>
            <div className="flex flex-wrap justify-center md:justify-start items-start ml-0 md:ml-[26px] gap-6 md:gap-0">
              <div className="flex flex-col shrink-0 items-center mt-1.5 mr-0 md:mr-16 gap-[3px]">
                <div className="flex flex-col items-center">
                  <span className="text-[#D96F28] text-[24px] md:text-[28px] font-black">2024</span>
                </div>
                <div className="flex flex-col items-start pb-[1px] px-[7px]">
                  <span className="text-[#A07050] text-xs font-normal">Founded</span>
                </div>
              </div>
              <div className="flex flex-col shrink-0 items-center mt-1.5 mr-0 md:mr-16 gap-[3px]">
                <div className="flex flex-col items-start px-[9px]">
                  <span className="text-[#D96F28] text-[24px] md:text-[28px] font-black">50K+</span>
                </div>
                <div className="flex flex-col items-center pb-[1px]">
                  <span className="text-[#A07050] text-xs font-normal">Pets registered</span>
                </div>
              </div>
              <div className="flex flex-col shrink-0 items-center mr-0 md:mr-[52px] gap-[3px]">
                <div className="flex flex-col items-start px-5">
                  <span className="text-[#D96F28] text-[24px] md:text-[28px] font-black">4</span>
                </div>
                <div className="flex flex-col items-center pb-[1px]">
                  <span className="text-[#A07050] text-xs font-normal">Cities live</span>
                </div>
              </div>
              <div className="flex flex-col shrink-0 items-center">
                <span className="text-[#D96F28] text-[24px] md:text-[28px] font-black mr-0 md:mr-3.5">1 min</span>
                <span className="text-[#A07050] text-xs font-normal mt-0 md:mt-[41px]">To register</span>
              </div>
            </div>
          </div>
          <div className="flex-1 self-stretch hidden md:block" />
          <img
            src="/images/banner-2.png"
            alt="About hero"
            className="w-[280px] md:w-[472px] h-auto md:h-[472px] mx-auto md:mr-[21px] object-fill mt-8 md:mt-0"
          />
        </div>

        {/* Inspiration pill */}
        <button className="flex flex-col items-start bg-[#FFF0E4] text-left py-1.5 px-[15px] mb-3.5 mx-auto md:ml-[775px] rounded-[99px] border border-solid border-[#F0D5B8]">
          <span className="text-[#D96F28] text-xs font-bold">💡 The inspiration</span>
        </button>

        {/* Why we built Tailio heading */}
        <div className="flex flex-col items-start self-stretch max-w-[1094px] mx-auto mb-3.5 px-4 md:px-0">
          <span className="text-[#2C1A0E] text-3xl md:text-4xl font-black text-center md:text-left w-full">Why we built Tailio</span>
        </div>

        <div className="flex flex-col md:flex-row items-start self-stretch max-w-[1094px] mb-5 mx-auto gap-[66px] px-4 md:px-0">

          {/* Left - Quote card with floating badge */}
          <div className="flex-1 relative mt-[72px] w-full">
            <div className="flex flex-col bg-white pt-[33px] pr-[20px] md:pr-[33px] rounded-3xl border border-solid border-[#F0D5B8] shadow-[0px_8px_40px_#B464281A]">
              <span className="text-[#FFDBB8] text-[60px] md:text-[80px] mb-3.5 ml-[20px] md:ml-[33px] font-black">"</span>
              <div className="flex flex-col mb-4 ml-[20px] md:ml-[33px]">
                <span className="text-[#2C1A0E] text-base md:text-lg font-normal leading-relaxed">
                  We waited for hours on the municipal website only for the portal to crash during the final step. And even after it worked, the entire process was confusing, slow, and frustrating. That was the day we decided to build Tailio.
                </span>
              </div>
              <div className="flex flex-col pt-1 mb-[60px] ml-[20px] md:ml-[33px] gap-[1px]">
                <span className="text-[#2C1A0E] text-sm font-bold">The Founding Moment</span>
                <span className="text-[#A07050] text-xs font-normal">Delhi, 2023</span>
              </div>
            </div>
            {/* Floating orange badge */}
            <button className="flex flex-col items-center bg-[#FF8C42] absolute top-[-17px] right-[-10px] md:right-[-17px] py-3.5 px-[15px] md:px-[18px] gap-[3px] rounded-[14px] border-0 shadow-[0px_6px_20px_#FF8C4257]">
              <span className="text-white text-[20px] md:text-[26px] font-black">913</span>
              <span className="text-white text-[9px] md:text-[11px] font-normal text-center w-[70px] md:w-[84px]">
                Registered pets<br />in all of Delhi
              </span>
            </button>
          </div>

          {/* Right - Story text with all points aligned vertically */}
          <div className="flex-1 flex flex-col gap-6">
            <span className="text-[#6B3A1F] text-[14px] md:text-[15px] font-normal leading-relaxed text-center md:text-left">
              Like millions of pet owners in India, our founders loved their pets deeply but had no idea that not registering them was illegal. When the Supreme Court of India mandated pet registration across Delhi NCR, the process to comply was shockingly broken.
            </span>
            
            <span className="text-[#6B3A1F] text-[14px] md:text-[15px] font-normal leading-relaxed text-center md:text-left">
              Long queues at municipal offices, confusing paperwork, no digital records, and zero guidance on what to do — responsible pet owners were being failed by a system that hadn't evolved in decades.
            </span>
            
            {/* Point 1 */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button className="flex items-center justify-center bg-[#FF8C42] w-8 h-8 rounded-[15px] border-2 border-solid border-[#FF8C42] shrink-0 mx-auto sm:mx-0">
                <span className="text-[#2C1A0E] text-sm">💡</span>
              </button>
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[#2C1A0E] text-sm font-bold block mb-1">The problem was discovered</span>
                <span className="text-[#A07050] text-[13px] font-normal leading-relaxed">
                  Our co-founders tried to register their pets and found the process broken — hours lost, forms rejected, no digital option.
                </span>
              </div>
            </div>
            
            {/* Point 2 */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button className="flex items-center justify-center bg-[#FF8C42] w-8 h-8 rounded-[15px] border-2 border-solid border-[#FF8C42] shrink-0 mx-auto sm:mx-0">
                <span className="text-[#2C1A0E] text-sm">🛠️</span>
              </button>
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[#2C1A0E] text-sm font-bold block mb-1">Tailio was built in 90 days</span>
                <span className="text-[#A07050] text-[13px] font-normal leading-relaxed">
                  A small team of builders and pet lovers came together to digitise the entire registration process from scratch.
                </span>
              </div>
            </div>
            
            {/* Point 3 - Launched */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button className="flex items-center justify-center bg-[#FF8C42] w-8 h-8 rounded-[15px] border-2 border-solid border-[#FF8C42] shrink-0 mx-auto sm:mx-0">
                <span className="text-[#2C1A0E] text-sm">🚀</span>
              </button>
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[#2C1A0E] text-sm font-bold block mb-1">Launched across Delhi NCR</span>
                <span className="text-[#A07050] text-[13px] font-normal leading-relaxed">
                  Live in Delhi, Noida, Ghaziabad & Gurugram — with thousands of pets registered in our first few months.
                </span>
              </div>
            </div>
            
            {/* Point 4 - Expanding */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button className="flex items-center justify-center bg-[#FFF0E4] w-8 h-8 rounded-[15px] border-2 border-solid border-[#FFDBB8] shrink-0 mx-auto sm:mx-0">
                <span className="text-[#2C1A0E] text-sm">🌍</span>
              </button>
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[#2C1A0E] text-sm font-bold block mb-1">Expanding to more cities</span>
                <span className="text-[#A07050] text-[13px] font-normal leading-relaxed">
                  Chandigarh is next. We're building the infrastructure for every city in India that mandates pet registration.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="flex flex-col items-center self-stretch bg-[#2C1A0E] pt-20 mb-[122px] px-4">
          <button className="flex flex-col items-start bg-[#FF8C4226] text-left py-1.5 px-[15px] mb-3.5 rounded-[99px] border border-solid border-[#FF8C4240] mx-auto">
            <span className="text-[#FFDBB8] text-xs font-bold">What drives us</span>
          </button>
          <div className="flex flex-col items-center pt-0.5 px-4 md:px-[107px] mb-3.5">
            <span className="text-[#FFF3E0] text-3xl md:text-4xl font-black text-center">Our mission & vision</span>
          </div>
          <div className="flex flex-col items-center px-4 md:px-6 mb-[47px]">
            <span className="text-[#FFF3E0] text-[14px] md:text-[15px] font-normal leading-relaxed text-center">
              We believe every pet deserves a verified identity, and every pet owner<br className="hidden md:block" /> deserves a system that actually works for them.
            </span>
          </div>
          {/* Icons row - using img tags */}
          <div className="flex flex-wrap justify-center items-center mb-2.5 gap-6 md:gap-0">
            <img src="/images/target.png" className="w-12 h-12 mr-0 md:mr-[145px] rounded-[18px] object-fill" alt="Target icon" />
            <img src="/images/something.png" className="w-12 h-12 mr-0 md:mr-[146px] rounded-[18px] object-fill" alt="Planet icon" />
            <img src="/images/widget.png" className="w-12 h-12 rounded-[18px] object-fill" alt="Widget icon" />
          </div>
          <div className="flex flex-col md:flex-row items-center mb-[34px] gap-8 md:gap-0">
            <div className="flex flex-col shrink-0 items-center mr-0 md:mr-[66px] gap-2.5 text-center">
              <div className="flex flex-col items-center pt-2">
                <span className="text-[#FFF3E0] text-[17px] font-bold w-[91px]">Make compliance effortless</span>
              </div>
              <span className="text-[#FFF3E0] text-[13px] font-normal w-[200px] md:w-[121px] leading-relaxed">
                No pet owner should face fines because the system was confusing. We remove barriers between ownership and compliance.
              </span>
            </div>
            <div className="flex flex-col shrink-0 items-center mr-0 md:mr-[66px] gap-2.5 text-center">
              <div className="flex flex-col items-center pt-2">
                <span className="text-[#FFF3E0] text-[17px] font-bold w-[117px]">Give every pet an identity</span>
              </div>
              <span className="text-[#FFF3E0] text-[13px] font-normal w-[200px] md:w-[125px] leading-relaxed">
                A registered pet is a protected pet. With a digital ID, health records and a QR tag, every pet becomes findable, traceable, and cared for.
              </span>
            </div>
            <div className="flex flex-col shrink-0 items-center gap-2.5 text-center">
              <div className="flex flex-col items-center pt-2">
                <span className="text-[#FFF3E0] text-[17px] font-bold w-[115px]">Build India's pet ecosystem</span>
              </div>
              <span className="text-[#FFF3E0] text-[13px] font-normal w-[200px] md:w-[126px] leading-relaxed">
                Registration is just the start. Vaccination,<br className="hidden md:block" /> healthcare, adoption, and commerce. We're<br className="hidden md:block" /> building the complete infrastructure for pet<br className="hidden md:block" /> ownership in India.
              </span>
            </div>
          </div>
        </div>

        {/* Meet our Founders */}
        <div className="flex flex-col self-stretch max-w-[992px] mb-20 mx-auto gap-[52px] px-4">
          <div className="flex flex-col items-center self-stretch gap-3.5">
            <button className="flex flex-col items-start bg-[#FFF0E4] text-left py-1.5 px-[15px] rounded-[99px] border border-solid border-[#F0D5B8] mx-auto">
              <span className="text-[#D96F28] text-xs font-bold">The people behind Tailio</span>
            </button>
            <div className="flex flex-col items-center self-stretch pt-0.5">
              <span className="text-[#2C1A0E] text-3xl md:text-4xl font-black text-center">Meet our Founders</span>
            </div>
            <div className="flex flex-col items-center px-1">
              <span className="text-[#6B3A1F] text-[14px] md:text-[15px] font-normal text-center w-full md:w-[468px] leading-relaxed">
                A small team with big conviction — that every pet in India deserves to<br className="hidden md:block" /> be registered, protected, and loved.
              </span>
            </div>
          </div>

          {/* Founder Cards */}
          <div className="flex flex-wrap items-stretch self-stretch pb-[45px] gap-4">
            {/* Founder 1 - Kaavya */}
            <div className="flex flex-1 flex-col items-start bg-white pt-[1px] rounded-[20px] border border-solid border-[#FAF0E6] min-w-[200px]">
              <div className="relative self-stretch h-[190px] mb-[21px] mx-[1px] overflow-hidden rounded-t-[20px]" 
                   style={{ background: "linear-gradient(180deg, #FFF0E4, #FFE5C4)" }}>
                <img 
                  src="/images/founder1.jpeg"
                  alt="Kaavya Chhabra"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col items-start self-stretch mb-[3px] mx-[21px]">
                <span className="text-[#2C1A0E] text-lg font-bold">Kaavya Chhabra</span>
              </div>
              <button className="flex flex-col items-start bg-[#FFF0E4] text-left py-[3px] px-3 mb-1 ml-[21px] rounded-[99px] border-0">
                <span className="text-[#D96F28] text-xs font-bold">Co-founder</span>
              </button>
              <div className="flex flex-col items-start self-stretch pt-2 mb-[45px] mx-[21px]">
                <span className="text-[#6B3A1F] text-[13px] font-normal leading-relaxed">
                  A product builder with 8 years in consumer tech and a lifelong dog parent. Frustrated by the broken pet registration system, they left their corporate role to build Tailio from scratch.
                </span>
              </div>
            </div>

            {/* Founder 2 - Nitin */}
            <div className="flex flex-1 flex-col items-start bg-white pt-[1px] rounded-[20px] border border-solid border-[#FAF0E6] min-w-[200px]">
              <div className="relative self-stretch h-[190px] mb-[21px] mx-[1px] overflow-hidden rounded-t-[20px]" 
                   style={{ background: "linear-gradient(180deg, #FFF0E4, #FFE5C4)" }}>
                <img 
                  src="/images/founder2.jpeg"
                  alt="Nitin Verma"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col items-start self-stretch mb-[3px] mx-[21px]">
                <span className="text-[#2C1A0E] text-lg font-bold">Nitin Verma</span>
              </div>
              <button className="flex flex-col items-start bg-[#FFF0E4] text-left py-[3px] px-3 mb-1 ml-[21px] rounded-[99px] border-0">
                <span className="text-[#D96F28] text-xs font-bold">Co-founder</span>
              </button>
              <div className="flex flex-col self-stretch pt-2 mb-[45px] mx-[21px]">
                <span className="text-[#6B3A1F] text-[13px] font-normal leading-relaxed">
                  Drives partnerships, customer experience, and market expansion, leveraging entrepreneurial expertise across sourcing, automotive detailing, and paint solutions businesses.
                </span>
              </div>
            </div>

            {/* Founder 3 - Akshay */}
            <div className="flex flex-1 flex-col items-start bg-white pt-[1px] rounded-[20px] border border-solid border-[#FAF0E6] min-w-[200px]">
              <div className="relative self-stretch h-[190px] mb-[21px] mx-[1px] overflow-hidden rounded-t-[20px]" 
                   style={{ background: "linear-gradient(180deg, #FFF0E4, #FFE5C4)" }}>
                <img 
                  src="/images/founder3.jpeg"
                  alt="Akshay Verma"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col items-start self-stretch mb-[3px] mx-[21px]">
                <span className="text-[#2C1A0E] text-lg font-bold">Akshay Verma</span>
              </div>
              <button className="flex flex-col items-start bg-[#FFF0E4] text-left py-[3px] px-3 mb-1 ml-[21px] rounded-[99px] border-0">
                <span className="text-[#D96F28] text-xs font-bold">Co-founder</span>
              </button>
              <div className="flex flex-col self-stretch pt-2 mb-[45px] mx-[21px]">
                <span className="text-[#6B3A1F] text-[13px] font-normal leading-relaxed">
                  Built a scalable automotive aesthetics business, leading operations, luxury refinishing projects, talent development, and systems focused on quality and sustainable growth.
                </span>
              </div>
            </div>

            {/* Founder 4 - Anukrit */}
            <div className="flex flex-1 flex-col items-start bg-white pt-[1px] rounded-[20px] border border-solid border-[#FAF0E6] min-w-[200px]">
              <div className="relative self-stretch h-[190px] mb-[21px] mx-[1px] overflow-hidden rounded-t-[20px]" 
                   style={{ background: "linear-gradient(180deg, #FFF0E4, #FFE5C4)" }}>
                <img 
                  src="/images/founder4.jpeg"
                  alt="Anukrit Mahajan"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col items-start self-stretch mb-[3px] mx-[21px]">
                <span className="text-[#2C1A0E] text-lg font-bold">Anukrit Mahajan</span>
              </div>
              <button className="flex flex-col items-start bg-[#FFF0E4] text-left py-[3px] px-3 mb-1 ml-[21px] rounded-[99px] border-0">
                <span className="text-[#D96F28] text-xs font-bold">Co-founder</span>
              </button>
              <div className="flex flex-col self-stretch pt-2 mb-[23px] mx-[21px]">
                <span className="text-[#6B3A1F] text-[13px] font-normal leading-relaxed">
                  Engineering graduate from Manipal Institute of Technology and MBA from China Europe International Business School, building scalable ecommerce ventures through innovation, strategy, and deep emerging-market expertise.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Our Values */}
        <div className="flex flex-col self-stretch max-w-[1032px] mb-[97px] mx-auto gap-[47px] px-4">
          <div className="flex flex-col items-center self-stretch gap-3.5">
            <button className="flex flex-col items-start bg-[#FFF0E4] text-left py-1.5 px-[15px] rounded-[99px] border border-solid border-[#F0D5B8] mx-auto">
              <span className="text-[#D96F28] text-xs font-bold">How we work</span>
            </button>
            <div className="flex flex-col items-center self-stretch pt-0.5">
              <span className="text-[#2C1A0E] text-3xl md:text-4xl font-black text-center">Our values</span>
            </div>
            <div className="flex flex-col items-center px-2.5">
              <span className="text-[#6B3A1F] text-[14px] md:text-[15px] font-normal text-center w-full md:w-[437px] leading-relaxed">
                The principles we bring to work every day — and to every pet we<br className="hidden md:block" /> register.
              </span>
            </div>
          </div>

          <div className="flex flex-col self-stretch gap-[17px]">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row items-stretch self-stretch gap-4">
              <div className="flex flex-1 items-start bg-white py-[29px] px-[25px] gap-[18px] rounded-[18px] border border-solid border-[#FAF0E6] flex-col md:flex-row text-center md:text-left">
                <button className="flex flex-col shrink-0 items-start bg-[#FFF0E4] text-left py-[11px] px-3 rounded-xl border-0 mx-auto md:mx-0">
                  <span className="text-[#2C1A0E] text-2xl">🎯</span>
                </button>
                <div className="flex flex-1 flex-col gap-[7px]">
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#2C1A0E] text-[17px] font-bold">Simplicity over complexity</span>
                  </div>
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#6B3A1F] text-[13px] font-normal w-full md:w-[389px] leading-relaxed">
                      If it takes more than 5 minutes, we've failed. Every feature we build is ruthlessly simplified so that any pet owner — regardless of technical ability — can use it with ease.
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-start bg-white py-[29px] px-[25px] gap-[18px] rounded-[18px] border border-solid border-[#FAF0E6] flex-col md:flex-row text-center md:text-left">
                <button className="flex flex-col shrink-0 items-start bg-[#FFF0E4] text-left py-[11px] px-3 rounded-xl border-0 mx-auto md:mx-0">
                  <span className="text-[#2C1A0E] text-2xl">🔒</span>
                </button>
                <div className="flex flex-1 flex-col gap-[7px]">
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#2C1A0E] text-[17px] font-bold">Trust is everything</span>
                  </div>
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#6B3A1F] text-[13px] font-normal w-full md:w-96 leading-relaxed">
                      Pet owners share sensitive documents with us. We treat that trust with the highest standard of data security, transparency, and accountability — always.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row items-stretch self-stretch gap-4">
              <div className="flex flex-1 items-start bg-white py-[29px] px-[25px] gap-[18px] rounded-[18px] border border-solid border-[#FAF0E6] flex-col md:flex-row text-center md:text-left">
                <button className="flex flex-col shrink-0 items-start bg-[#FFF0E4] text-left py-[11px] px-3 rounded-xl border-0 mx-auto md:mx-0">
                  <span className="text-[#2C1A0E] text-2xl">🐾</span>
                </button>
                <div className="flex flex-1 flex-col gap-[7px]">
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#2C1A0E] text-[17px] font-bold">Pets first, always</span>
                  </div>
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#6B3A1F] text-[13px] font-normal w-full md:w-[382px] leading-relaxed">
                      Every decision we make is filtered through one question: does this make life better for pets and the people who love them? If not, it doesn't ship.
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-start bg-white py-[29px] px-[25px] gap-[18px] rounded-[18px] border border-solid border-[#FAF0E6] flex-col md:flex-row text-center md:text-left">
                <button className="flex flex-col shrink-0 items-start bg-[#FFF0E4] text-left py-[11px] px-3 rounded-xl border-0 mx-auto md:mx-0">
                  <span className="text-[#2C1A0E] text-2xl">⚡</span>
                </button>
                <div className="flex flex-1 flex-col gap-[7px]">
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#2C1A0E] text-[17px] font-bold">Move with urgency</span>
                  </div>
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#6B3A1F] text-[13px] font-normal w-full md:w-[376px] leading-relaxed">
                      Every unregistered pet is one municipal drive away from a fine or worse. We build fast because the problem is real and the clock is ticking for pet owners across India.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col items-center self-stretch bg-[#2C1A0E] pt-20 pb-[81px] px-4 md:px-[196px] mb-[158px]">
          <div className="flex flex-col items-center self-stretch mb-[13px]">
            <span className="text-white text-[28px] md:text-[40px] font-black text-center">Ready to register your pet?</span>
          </div>
          <div className="flex flex-col items-center mb-3">
            <span className="text-white text-sm md:text-base font-normal text-center w-full md:w-[479px] leading-relaxed">
              Join 50,000+ pet parents across Delhi NCR who've made their pets<br className="hidden md:block" /> official with Tailio in just 1 minute.
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-start self-stretch pt-[23px] gap-3.5">
            <button className="flex flex-col shrink-0 items-start bg-white text-left py-[15px] px-[30px] rounded-xl border-0 w-full sm:w-auto text-center">
              <span className="text-[#D96F28] text-[15px] font-bold">Register Your Pet →</span>
            </button>
            <button className="flex flex-col shrink-0 items-start bg-transparent text-left py-[15px] px-8 rounded-xl border border-solid border-white w-full sm:w-auto text-center">
              <span className="text-white text-[15px] font-bold">Talk to us</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center self-stretch max-w-[1086px] mx-auto px-4">
          <div className="flex flex-col shrink-0 items-center md:items-start gap-2 text-center md:text-left">
            <img src="/images/tailio.png" className="w-[180px] md:w-[260px] h-auto mb-2 mx-auto md:mx-0" alt="Tailio logo" />
            <span className="text-[#D96F28] text-sm font-normal">
              Making pet registration simple, digital,<br />and stress-free across Delhi NCR.
            </span>
          </div>
          <div className="flex-1 self-stretch hidden md:block" />
          <div className="flex flex-col shrink-0 items-center md:items-start mr-0 md:mr-[130px] mt-6 md:mt-0 text-center md:text-left">
            <span className="text-[#FF8C42] text-xs font-bold mb-[17px]">Platform</span>
            <span className="text-[#FF8C42] text-sm font-normal mb-3">Pet Registration</span>
            <span className="text-[#FF8C42] text-sm font-normal mb-3">Digital Pet ID</span>
            <span className="text-[#FF8C42] text-sm font-normal mb-3">Vaccination Tracker</span>
            <span className="text-[#FF8C42] text-sm font-normal">Lost Pet QR</span>
          </div>
          <div className="flex flex-col shrink-0 items-center md:items-start mr-0 md:mr-[42px] mt-6 md:mt-0 text-center md:text-left">
            <div className="flex flex-col items-start">
              <span className="text-[#FF8C42] text-xs font-bold">Cities</span>
            </div>
            <div className="flex flex-col items-center gap-2.5 mt-4">
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start">
                  <span className="text-[#FF8C42] text-sm font-normal">Delhi</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start">
                  <span className="text-[#FF8C42] text-sm font-normal">Noida</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start">
                  <span className="text-[#FF8C42] text-sm font-normal">Ghaziabad</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start">
                  <span className="text-[#FF8C42] text-sm font-normal">Gurugram</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col shrink-0 items-center md:items-start mt-6 md:mt-0 text-center md:text-left">
            <div className="flex flex-col items-start">
              <span className="text-[#FF8C42] text-xs font-bold">Company</span>
            </div>
            <div className="flex flex-col items-center gap-2.5 mt-4">
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start">
                  <span className="text-[#FF8C42] text-sm font-normal">About Tailio</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start">
                  <span className="text-[#FF8C42] text-sm font-normal">Privacy Policy</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start">
                  <span className="text-[#FF8C42] text-sm font-normal">Terms of Service</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start">
                  <span className="text-[#FF8C42] text-sm font-normal">Contact Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
"use client";

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col items-start self-stretch bg-[#FFF0E4] pb-[72px] pt-[80px]">

        {/* Hero Section */}
        <div className="flex items-start self-stretch mb-3" style={{ background: "linear-gradient(180deg, #FFFAF4, #FFF3E0, #FFF0E4)" }}>
          <div className="flex-1 self-stretch" />
          <div className="flex flex-col shrink-0 items-start">
            <button className="flex flex-col items-start bg-[#FFDBB8] text-left py-1.5 px-[17px] mb-5 rounded-[99px] border border-solid border-[#F0D5B8]">
              <span className="text-[#D96F28] text-xs font-bold">Our story</span>
            </button>
            <div className="flex flex-col items-center mb-6">
              <span className="text-[#2C1A0E] text-[52px] text-center w-[413px]">
                Built by pet parents,<br />for every pet parent.
              </span>
            </div>
            <span className="text-[#6B3A1F] text-[17px] w-[557px] mb-10">
              Tailio was born out of a simple frustration — why is doing the right thing<br />for your pet so unnecessarily hard? We set out to fix that, one registration<br />at a time.
            </span>
            <div className="flex items-start ml-[26px]">
              <div className="flex flex-col shrink-0 items-center mt-1.5 mr-16 gap-[3px]">
                <div className="flex flex-col items-center">
                  <span className="text-[#D96F28] text-[28px] font-bold">2024</span>
                </div>
                <div className="flex flex-col items-start pb-[1px] px-[7px]">
                  <span className="text-[#A07050] text-xs">Founded</span>
                </div>
              </div>
              <div className="flex flex-col shrink-0 items-center mt-1.5 mr-16 gap-[3px]">
                <div className="flex flex-col items-start px-[9px]">
                  <span className="text-[#D96F28] text-[28px] font-bold">50K+</span>
                </div>
                <div className="flex flex-col items-center pb-[1px]">
                  <span className="text-[#A07050] text-xs">Pets registered</span>
                </div>
              </div>
              <div className="flex flex-col shrink-0 items-center mr-[52px] gap-[3px]">
                <div className="flex flex-col items-start px-5">
                  <span className="text-[#D96F28] text-[28px] font-bold">4</span>
                </div>
                <div className="flex flex-col items-center pb-[1px]">
                  <span className="text-[#A07050] text-xs">Cities live</span>
                </div>
              </div>
              <span className="text-[#D96F28] text-[28px] font-bold mr-3.5">1 min</span>
              <span className="text-[#A07050] text-xs mt-[41px]">To register</span>
            </div>
          </div>
          <div className="flex-1 self-stretch" />
          <img
            src="/images/banner-2.png"
            alt="About hero"
            className="w-[472px] h-[472px] mr-[21px] object-fill"
          />
        </div>

        {/* Inspiration pill */}
        <button className="flex flex-col items-start bg-[#FFF0E4] text-left py-1.5 px-[15px] mb-3.5 ml-[775px] rounded-[99px] border border-solid border-[#F0D5B8]">
          <span className="text-[#D96F28] text-xs font-bold">💡 The inspiration</span>
        </button>

        {/* Why we built Tailio heading */}
        <div className="flex flex-col items-start self-stretch max-w-[1094px] mx-auto mb-3.5">
  <span className="text-[#2C1A0E] text-4xl font-bold">Why we built Tailio</span>
</div>


<div className="flex items-start self-stretch max-w-[1094px] mb-5 mx-auto gap-[66px]">

  {/* Left - Quote card with floating badge */}
  <div className="flex-1 relative mt-[72px]">
    <div className="flex flex-col bg-white pt-[33px] pr-[33px] rounded-3xl border border-solid border-[#F0D5B8] shadow-[0px_8px_40px_#B464281A]">
      <span className="text-[#FFDBB8] text-[80px] mb-3.5 ml-[33px]">"</span>
      <div className="flex flex-col mb-4 ml-[33px]">
        <span className="text-[#2C1A0E] text-lg">
          We waited for hours on the municipal website only for the portal to crash during the final step. And even after it worked, the entire process was confusing, slow, and frustrating. That was the day we decided to build Tailio.
        </span>
      </div>
      <div className="flex flex-col pt-1 mb-[60px] ml-[33px] gap-[1px]">
        <span className="text-[#2C1A0E] text-sm font-bold">The Founding Moment</span>
        <span className="text-[#A07050] text-xs">Delhi, 2023</span>
      </div>
    </div>
    {/* Floating orange badge */}
    <button className="flex flex-col items-center bg-[#FF8C42] absolute top-[-17px] right-[-17px] py-3.5 px-[18px] gap-[3px] rounded-[14px] border-0 shadow-[0px_6px_20px_#FF8C4257]">
      <span className="text-white text-[26px] font-bold">913</span>
      <span className="text-white text-[11px] text-center w-[84px]">
        Registered pets<br />in all of Delhi
      </span>
    </button>
  </div>

  {/* Right - Story text with all points aligned vertically */}
  <div className="flex-1 flex flex-col gap-6">
    <span className="text-[#6B3A1F] text-[15px]">
      Like millions of pet owners in India, our founders loved their pets deeply but had no idea that not registering them was illegal. When the Supreme Court of India mandated pet registration across Delhi NCR, the process to comply was shockingly broken.
    </span>
    
    <span className="text-[#6B3A1F] text-[15px]">
      Long queues at municipal offices, confusing paperwork, no digital records, and zero guidance on what to do — responsible pet owners were being failed by a system that hadn't evolved in decades.
    </span>
    
    {/* Point 1 */}
    <div className="flex items-start gap-4">
      <button className="flex items-center justify-center bg-[#FF8C42] w-8 h-8 rounded-[15px] border-2 border-solid border-[#FF8C42] shrink-0">
        <span className="text-[#2C1A0E] text-sm">💡</span>
      </button>
      <div className="flex-1">
        <span className="text-[#2C1A0E] text-sm font-bold block mb-1">The problem was discovered</span>
        <span className="text-[#A07050] text-[13px]">
          Our co-founders tried to register their pets and found the process broken — hours lost, forms rejected, no digital option.
        </span>
      </div>
    </div>
    
    {/* Point 2 */}
    <div className="flex items-start gap-4">
      <button className="flex items-center justify-center bg-[#FF8C42] w-8 h-8 rounded-[15px] border-2 border-solid border-[#FF8C42] shrink-0">
        <span className="text-[#2C1A0E] text-sm">🛠️</span>
      </button>
      <div className="flex-1">
        <span className="text-[#2C1A0E] text-sm font-bold block mb-1">Tailio was built in 90 days</span>
        <span className="text-[#A07050] text-[13px]">
          A small team of builders and pet lovers came together to digitise the entire registration process from scratch.
        </span>
      </div>
    </div>
    
    {/* Point 3 - Launched */}
    <div className="flex items-start gap-4">
      <button className="flex items-center justify-center bg-[#FF8C42] w-8 h-8 rounded-[15px] border-2 border-solid border-[#FF8C42] shrink-0">
        <span className="text-[#2C1A0E] text-sm">🚀</span>
      </button>
      <div className="flex-1">
        <span className="text-[#2C1A0E] text-sm font-bold block mb-1">Launched across Delhi NCR</span>
        <span className="text-[#A07050] text-[13px]">
          Live in Delhi, Noida, Ghaziabad & Gurugram — with thousands of pets registered in our first few months.
        </span>
      </div>
    </div>
    
    {/* Point 4 - Expanding */}
    <div className="flex items-start gap-4">
      <button className="flex items-center justify-center bg-[#FFF0E4] w-8 h-8 rounded-[15px] border-2 border-solid border-[#FFDBB8] shrink-0">
        <span className="text-[#2C1A0E] text-sm">🌍</span>
      </button>
      <div className="flex-1">
        <span className="text-[#2C1A0E] text-sm font-bold block mb-1">Expanding to more cities</span>
        <span className="text-[#A07050] text-[13px]">
          Chandigarh is next. We're building the infrastructure for every city in India that mandates pet registration.
        </span>
      </div>
    </div>
  </div>
</div>

        {/* Mission & Vision Section */}
        <div className="flex flex-col items-center self-stretch bg-[#2C1A0E] pt-20 mb-[122px]">
          <button className="flex flex-col items-start bg-[#FF8C4226] text-left py-1.5 px-[15px] mb-3.5 rounded-[99px] border border-solid border-[#FF8C4240]">
            <span className="text-[#FFDBB8] text-xs font-bold">What drives us</span>
          </button>
          <div className="flex flex-col items-start pt-0.5 px-[107px] mb-3.5">
            <span className="text-[#FFF3E0] text-4xl font-bold">Our mission & vision</span>
          </div>
          <div className="flex flex-col items-start px-6 mb-[47px]">
            <span className="text-[#FFF3E0] text-[15px]">
              We believe every pet deserves a verified identity, and every pet owner<br />deserves a system that actually works for them.
            </span>
          </div>
          {/* Icons row - using img tags */}
          <div className="flex items-center mb-2.5">
            <img src="/images/target.png" className="w-12 h-12 mr-[145px] rounded-[18px] object-fill" alt="Target icon" />
            <img src="/images/something.png" className="w-12 h-12 mr-[146px] rounded-[18px] object-fill" alt="Planet icon" />
            <img src="/images/widget.png" className="w-12 h-12 rounded-[18px] object-fill" alt="Widget icon" />
          </div>
          <div className="flex items-start mb-[34px]">
            <div className="flex flex-col shrink-0 items-center mr-[66px] gap-2.5">
              <div className="flex flex-col items-start pt-2 pr-9">
                <span className="text-[#FFF3E0] text-[17px] font-bold w-[91px]">Make compliance effortless</span>
              </div>
              <span className="text-[#FFF3E0] text-[13px] w-[121px]">
                No pet owner should face fines because the system was confusing. We remove barriers between ownership and compliance.
              </span>
            </div>
            <div className="flex flex-col shrink-0 items-center mr-[66px] gap-2.5">
              <div className="flex flex-col items-start pt-2 pr-[11px]">
                <span className="text-[#FFF3E0] text-[17px] font-bold w-[117px]">Give every pet an identity</span>
              </div>
              <span className="text-[#FFF3E0] text-[13px] w-[125px]">
                A registered pet is a protected pet. With a digital ID, health records and a QR tag, every pet becomes findable, traceable, and cared for.
              </span>
            </div>
            <div className="flex flex-col shrink-0 items-center gap-2.5">
              <div className="flex flex-col items-start pt-2 pr-3">
                <span className="text-[#FFF3E0] text-[17px] font-bold w-[115px]">Build India's pet ecosystem</span>
              </div>
              <span className="text-[#FFF3E0] text-[13px] w-[126px]">
                Registration is just the start. Vaccination,<br />healthcare, adoption, and commerce. We're<br />building the complete infrastructure for pet<br />ownership in India.
              </span>
            </div>
          </div>
        </div>

        {/* Meet our Founders */}
        <div className="flex flex-col self-stretch max-w-[992px] mb-20 mx-auto gap-[52px]">
          <div className="flex flex-col items-center self-stretch gap-3.5">
            <button className="flex flex-col items-start bg-[#FFF0E4] text-left py-1.5 px-[15px] rounded-[99px] border border-solid border-[#F0D5B8]">
              <span className="text-[#D96F28] text-xs font-bold">The people behind Tailio</span>
            </button>
            <div className="flex flex-col items-center self-stretch pt-0.5">
              <span className="text-[#2C1A0E] text-4xl font-bold">Meet our Founders</span>
            </div>
            <div className="flex flex-col items-start px-1">
              <span className="text-[#6B3A1F] text-[15px] text-center w-[468px]">
                A small team with big conviction — that every pet in India deserves to<br />be registered, protected, and loved.
              </span>
            </div>
          </div>

          {/* Founder Cards - converting Image to img */}
          <div className="flex items-start self-stretch pb-[45px] gap-4">

            {/* Founder 1 - Kaavya */}
            <div className="flex flex-1 flex-col items-start bg-white pt-[1px] rounded-[20px] border border-solid border-[#FAF0E6]">
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
                <span className="text-[#6B3A1F] text-[13px] w-48">
                  A product builder with 8 years in<br />consumer tech and a lifelong dog<br />parent. Frustrated by the broken<br />pet registration system, they left<br />their corporate role to build Tailio<br />from scratch.
                </span>
              </div>
            </div>

            {/* Founder 2 - Nitin */}
            <div className="flex flex-1 flex-col items-start bg-white pt-[1px] rounded-[20px] border border-solid border-[#FAF0E6]">
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
                <span className="text-[#6B3A1F] text-[13px]">
                  Drives partnerships, customer experience, and market expansion, leveraging entrepreneurial expertise across sourcing, automotive detailing, and paint solutions businesses.
                </span>
              </div>
            </div>

            {/* Founder 3 - Akshay */}
            <div className="flex flex-1 flex-col items-start bg-white pt-[1px] rounded-[20px] border border-solid border-[#FAF0E6]">
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
                <span className="text-[#6B3A1F] text-[13px] w-[193px]">
                  Built a scalable automotive aesthetics business, leading operations, luxury refinishing projects, talent development, and systems focused on quality and sustainable growth.
                </span>
              </div>
            </div>

            {/* Founder 4 - Anukrit */}
            <div className="flex flex-1 flex-col items-start bg-white pt-[1px] rounded-[20px] border border-solid border-[#FAF0E6]">
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
                <span className="text-[#6B3A1F] text-[13px]">
                  Engineering graduate from Manipal Institute of Technology and MBA from China Europe International Business School, building scalable ecommerce ventures through innovation, strategy, and deep emerging-market expertise.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Our Values */}
        <div className="flex flex-col self-stretch max-w-[1032px] mb-[97px] mx-auto gap-[47px]">
          <div className="flex flex-col items-center self-stretch gap-3.5">
            <button className="flex flex-col items-start bg-[#FFF0E4] text-left py-1.5 px-[15px] rounded-[99px] border border-solid border-[#F0D5B8]">
              <span className="text-[#D96F28] text-xs font-bold">How we work</span>
            </button>
            <div className="flex flex-col items-center self-stretch pt-0.5">
              <span className="text-[#2C1A0E] text-4xl font-bold">Our values</span>
            </div>
            <div className="flex flex-col items-start px-2.5">
              <span className="text-[#6B3A1F] text-[15px] text-center w-[437px]">
                The principles we bring to work every day — and to every pet we<br />register.
              </span>
            </div>
          </div>

          <div className="flex flex-col self-stretch gap-[17px]">
            {/* Row 1 */}
            <div className="flex items-center self-stretch gap-4">
              <div className="flex flex-1 items-start bg-white py-[29px] px-[25px] gap-[18px] rounded-[18px] border border-solid border-[#FAF0E6]">
                <button className="flex flex-col shrink-0 items-start bg-[#FFF0E4] text-left py-[11px] px-3 rounded-xl border-0">
                  <span className="text-[#2C1A0E] text-2xl">🎯</span>
                </button>
                <div className="flex flex-1 flex-col gap-[7px]">
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#2C1A0E] text-[17px] font-bold">Simplicity over complexity</span>
                  </div>
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#6B3A1F] text-[13px] w-[389px]">
                      If it takes more than 5 minutes, we've failed. Every feature we build<br />is ruthlessly simplified so that any pet owner — regardless of<br />technical ability — can use it with ease.
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-start bg-white py-[29px] px-[25px] gap-[18px] rounded-[18px] border border-solid border-[#FAF0E6]">
                <button className="flex flex-col shrink-0 items-start bg-[#FFF0E4] text-left py-[11px] px-3 rounded-xl border-0">
                  <span className="text-[#2C1A0E] text-2xl">🔒</span>
                </button>
                <div className="flex flex-1 flex-col gap-[7px]">
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#2C1A0E] text-[17px] font-bold">Trust is everything</span>
                  </div>
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#6B3A1F] text-[13px] w-96">
                      Pet owners share sensitive documents with us. We treat that trust<br />with the highest standard of data security, transparency, and<br />accountability — always.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center self-stretch gap-4">
              <div className="flex flex-1 items-start bg-white py-[29px] px-[25px] gap-[18px] rounded-[18px] border border-solid border-[#FAF0E6]">
                <button className="flex flex-col shrink-0 items-start bg-[#FFF0E4] text-left py-[11px] px-3 rounded-xl border-0">
                  <span className="text-[#2C1A0E] text-2xl">🐾</span>
                </button>
                <div className="flex flex-1 flex-col gap-[7px]">
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#2C1A0E] text-[17px] font-bold">Pets first, always</span>
                  </div>
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#6B3A1F] text-[13px] w-[382px]">
                      Every decision we make is filtered through one question: does this<br />make life better for pets and the people who love them? If not, it<br />doesn't ship.
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-start bg-white py-[29px] px-[25px] gap-[18px] rounded-[18px] border border-solid border-[#FAF0E6]">
                <button className="flex flex-col shrink-0 items-start bg-[#FFF0E4] text-left py-[11px] px-3 rounded-xl border-0">
                  <span className="text-[#2C1A0E] text-2xl">⚡</span>
                </button>
                <div className="flex flex-1 flex-col gap-[7px]">
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#2C1A0E] text-[17px] font-bold">Move with urgency</span>
                  </div>
                  <div className="flex flex-col items-start self-stretch">
                    <span className="text-[#6B3A1F] text-[13px] w-[376px]">
                      Every unregistered pet is one municipal drive away from a fine or<br />worse. We build fast because the problem is real and the clock is<br />ticking for pet owners across India.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col items-center self-stretch bg-[#2C1A0E] pt-20 pb-[81px] px-[196px] mb-[158px]">
  <div className="flex flex-col items-center self-stretch mb-[13px]">
    <span className="text-white text-[40px] font-bold">Ready to register your pet?</span>
  </div>
  <div className="flex flex-col items-center mb-3">
    <span className="text-white text-base text-center w-[479px]">
      Join 50,000+ pet parents across Delhi NCR who've made their pets<br />official with Tailio in just 1 minute.
    </span>
  </div>
  <div className="flex justify-center items-start self-stretch pt-[23px] gap-3.5">
    <button className="flex flex-col shrink-0 items-start bg-white text-left py-[15px] px-[30px] rounded-xl border-0">
      <span className="text-[#D96F28] text-[15px] font-bold">Register Your Pet →</span>
    </button>
    <button className="flex flex-col shrink-0 items-start bg-transparent text-left py-[15px] px-8 rounded-xl border border-solid border-white">
      <span className="text-white text-[15px] font-bold">Talk to us</span>
    </button>
  </div>
</div>

        {/* Footer */}
        <div className="flex items-center self-stretch max-w-[1086px] mx-auto">
          <div className="flex flex-col shrink-0 items-start gap-2">
            <img src="/images/tailio.png" className="w-[260px] h-[260px] mr-[179px] object-fill" alt="Tailio logo" />
            <span className="text-[#D96F28] text-sm">
              Making pet registration simple, digital,<br />and stress-free across Delhi NCR.
            </span>
          </div>
          <div className="flex-1 self-stretch" />
          <div className="flex flex-col shrink-0 items-start mr-[130px]">
            <span className="text-[#FF8C42] text-xs font-bold mb-[17px] mr-[62px]">Platform</span>
            <span className="text-[#FF8C42] text-sm mb-3 mr-[27px]">Pet Registration</span>
            <span className="text-[#FF8C42] text-sm mb-3 mr-[46px]">Digital Pet ID</span>
            <span className="text-[#FF8C42] text-sm mb-3">Vaccination Tracker</span>
            <span className="text-[#FF8C42] text-sm mr-[53px]">Lost Pet QR</span>
          </div>
          <div className="flex flex-col shrink-0 items-center mr-[42px] gap-4">
            <div className="flex flex-col items-start pr-[148px]">
              <span className="text-[#FF8C42] text-xs font-bold">Cities</span>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start pr-[156px]">
                  <span className="text-[#FF8C42] text-sm">Delhi</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start pr-[151px]">
                  <span className="text-[#FF8C42] text-sm">Noida</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start pr-[119px]">
                  <span className="text-[#FF8C42] text-sm">Ghaziabad</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start pr-[124px]">
                  <span className="text-[#FF8C42] text-sm">Gurugram</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col shrink-0 items-center gap-4">
            <div className="flex flex-col items-start pr-[121px]">
              <span className="text-[#FF8C42] text-xs font-bold">Company</span>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start pr-[111px]">
                  <span className="text-[#FF8C42] text-sm">About Tailio</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start pr-[97px]">
                  <span className="text-[#FF8C42] text-sm">Privacy Policy</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start pr-[77px]">
                  <span className="text-[#FF8C42] text-sm">Terms of Service</span>
                </div>
              </div>
              <div className="flex flex-col items-center py-[1px]">
                <div className="flex flex-col items-start pr-[115px]">
                  <span className="text-[#FF8C42] text-sm">Contact Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
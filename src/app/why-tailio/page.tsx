"use client";
import { useState, useEffect } from "react";

export default function WhyTailioSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      alignSelf: 'stretch',
      background: 'linear-gradient(0deg, #EDE7DA 0%, #EDE7DA 100%), white',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      display: 'inline-flex',
      width: '100%'
    }}>
      {/* Main Hero Section */}
      <div style={{
        alignSelf: 'stretch',
        height: isMobile ? 'auto' : 699,
        position: 'relative',
        background: '#FAF6EF',
        overflow: 'hidden',
        padding: isMobile ? '40px 20px' : 0
      }}>
        {/* Background Gradient */}
        <div style={{
          width: 500,
          height: 500,
          right: -100,
          top: -80,
          position: 'absolute',
          background: 'radial-gradient(ellipse 70.71% 70.71% at 50.00% 50.00%, rgba(232, 96, 10, 0.08) 0%, rgba(232, 96, 10, 0) 65%)',
          display: isMobile ? 'none' : 'block'
        }} />

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 31,
          padding: isMobile ? '0' : '73px 0',
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          {/* Left Content */}
          <div style={{
            width: isMobile ? '100%' : 708,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 17,
            display: 'inline-flex'
          }}>
            <div style={{
              padding: '5px 14px',
              background: '#FFF0E4',
              borderRadius: 100,
              outline: '1px solid #FFCCA0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span style={{
                color: '#C04E06',
                fontSize: 10,
                fontFamily: 'DM Sans',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1.20px'
              }}>Why Tailio?</span>
            </div>

            <div>
              <span style={{
                color: '#2C1A0E',
                fontSize: isMobile ? 32 : 48,
                fontFamily: 'Fraunces',
                fontWeight: 900,
                lineHeight: isMobile ? '1.3' : '64.48px'
              }}>Both paths lead to registration.<br/>Only one's built with </span>
              <span style={{
                color: '#E8600A',
                fontSize: isMobile ? 32 : 48,
                fontFamily: 'Fraunces',
                fontStyle: 'italic',
                fontWeight: 700,
                lineHeight: isMobile ? '1.3' : '64.48px'
              }}>love.</span>
            </div>

            <div style={{ maxWidth: 558 }}>
              <span style={{
                color: '#7A5C40',
                fontSize: 15,
                fontFamily: 'DM Sans',
                fontWeight: 400,
                lineHeight: '25.50px'
              }}>
                The municipal portal works. Eventually. Probably. Tailio gets you legally registered in 60 seconds — from your phone, with no broken forms, no waiting weeks for a PDF.
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              paddingTop: 15
            }}>
              <button style={{
                padding: '13px 26px',
                background: '#E8600A',
                boxShadow: '0px 4px 16px rgba(232, 96, 10, 0.28), 0px 2px 0px #C04E06',
                borderRadius: 9,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 7
              }}>
                <span style={{ color: 'white', fontSize: 15, fontFamily: 'DM Sans', fontWeight: 600 }}>Register Your Pet — ₹999</span>
                <span style={{ color: 'white', fontSize: 17.3, fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 700 }}>→</span>
              </button>
              <button style={{
                padding: '13px 22px',
                borderRadius: 9,
                outline: '1px solid rgba(44, 26, 14, 0.18)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}>
                <span style={{ color: '#2C1A0E', fontSize: 15, fontFamily: 'DM Sans', fontWeight: 500 }}>See the difference</span>
              </button>
            </div>
          </div>

          {/* Right Stats Card */}
          <div style={{
            width: isMobile ? '100%' : 420,
            padding: '32px 28px 16px 28px',
            background: '#2C1A0E',
            borderRadius: 18,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: 180,
              height: 180,
              position: 'absolute',
              right: -40,
              top: -40,
              background: 'radial-gradient(ellipse 70.71% 70.71% at 50.00% 50.00%, rgba(232, 96, 10, 0.18) 0%, rgba(232, 96, 10, 0) 65%)'
            }} />

            <div style={{ marginBottom: 20 }}>
              <span style={{
                color: 'rgba(250, 246, 239, 0.40)',
                fontSize: 9.5,
                fontFamily: 'DM Sans',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1.33px'
              }}>The numbers don't lie</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Stat 1 */}
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)', paddingBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ minWidth: 90 }}>
                    <span style={{ color: '#FF8C3A', fontSize: 32, fontFamily: 'Fraunces', fontWeight: 900 }}>60s</span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(250, 246, 239, 0.60)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '18.85px' }}>
                      Average registration time on Tailio vs 2–4 weeks on the municipal portal
                    </span>
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)', paddingBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ minWidth: 90 }}>
                    <span style={{ color: '#FF8C3A', fontSize: 32, fontFamily: 'Fraunces', fontWeight: 900 }}>₹999</span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(250, 246, 239, 0.60)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '18.85px' }}>
                                      Launch offer — all-inclusive. Municipal portal charges ₹100–500 and still sends you to the office
                                    </span>
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)', paddingBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ minWidth: 90 }}>
                    <span style={{ color: '#FF8C3A', fontSize: 32, fontFamily: 'Fraunces', fontWeight: 900 }}>&lt; 72h</span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(250, 246, 239, 0.60)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '18.85px' }}>
                                      Certificate delivery after submission. No follow-ups needed — we handle everything
                                    </span>
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ minWidth: 90 }}>
                    <span style={{ color: '#FF8C3A', fontSize: 32, fontFamily: 'Fraunces', fontWeight: 900 }}>0</span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(250, 246, 239, 0.60)', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '18.85px' }}>
                                      Zero buffering. Zero endless forms. Zero broken links.
                                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Icons Row */}
      <div style={{
        alignSelf: 'stretch',
        background: '#2C1A0E',
        padding: '64px 20px',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 30
      }}>
        {[
          { icon: '🐾', text: 'Legally valid registration' },
          { icon: '📱', text: '100% online, from your phone' },
          { icon: '⚡', text: 'Done in under 60 seconds' },
          { icon: '💬', text: 'Support in under 2 hours' },
          { icon: '🔔', text: 'WhatsApp & email reminders' }
        ].map((feature, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 16,
              height: 16,
              background: '#FF8C3A',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: 10 }}>{feature.icon}</span>
            </div>
            <span style={{ color: 'rgba(250, 246, 239, 0.65)', fontSize: 13.5, fontFamily: 'DM Sans', fontWeight: 500 }}>
              {feature.text}
            </span>
            {idx < 4 && (
              <div style={{ width: 1, height: 28, background: 'rgba(255, 255, 255, 0.10)', marginLeft: 12 }} />
            )}
          </div>
        ))}
      </div>

      {/* Comparison Section */}
      <div style={{
        alignSelf: 'stretch',
        padding: isMobile ? '40px 20px' : '80px 40px',
        background: '#F3EDE0'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 30 }}>
            <div style={{
              display: 'inline-flex',
              padding: '5px 14px',
              background: '#FFF0E4',
              borderRadius: 100,
              outline: '1px solid #FFCCA0',
              marginBottom: 20
            }}>
              <span style={{ color: '#C04E06', fontSize: 10, fontFamily: 'DM Sans', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.20px' }}>
                Tailio vs Municipal Portal
              </span>
            </div>
            <h2 style={{
              color: '#2C1A0E',
              fontSize: isMobile ? 28 : 40,
              fontFamily: 'Fraunces',
              fontWeight: 900,
              lineHeight: '44px',
              marginBottom: 15
            }}>
              Or spend your <span style={{ color: '#E8600A', fontStyle: 'italic' }}>weekend</span> on the MCD portal.
            </h2>
            <p style={{ color: '#7A5C40', fontSize: 14.5, fontFamily: 'DM Sans', maxWidth: 540 }}>
              The municipal portal works. Eventually. Probably. Here's the difference in numbers.
            </p>
          </div>

          {/* Comparison Table */}
          <div style={{
            background: '#FFFCF8',
            borderRadius: 18,
            overflowX: 'auto',
            boxShadow: '0px 4px 20px rgba(44, 26, 14, 0.08)',
            outline: '1px solid rgba(44, 26, 14, 0.10)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '16px 24px', borderBottom: '1px solid rgba(44, 26, 14, 0.10)', color: '#A68660', fontSize: 13, fontWeight: 500, textTransform: 'uppercase' }}>What you get</th>
                  <th style={{ textAlign: 'center', padding: '16px 24px', borderBottom: '1px solid rgba(44, 26, 14, 0.10)', color: '#A68660', fontSize: 13, fontWeight: 500, textTransform: 'uppercase' }}>Tailio</th>
                  <th style={{ textAlign: 'center', padding: '16px 24px', borderBottom: '1px solid rgba(44, 26, 14, 0.10)', color: '#A68660', fontSize: 13, fontWeight: 500, textTransform: 'uppercase' }}>Municipal Portal</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Time to register", sub: "From start to submission", tailio: "Under 1 minute", portal: "2–4 weeks", icon: "⏱️" },
                  { label: "Works on your phone", sub: "No opening laptops for filing the form", tailio: "✓", portal: "✗", icon: "📱" },
                  { label: "Digital certificate", sub: "Always accessible on profile", tailio: "✓", portal: "✗", icon: "📄" },
                  { label: "Renewal reminders", sub: "WhatsApp, SMS & email", tailio: "✓", portal: "✗", icon: "🔔" },
                  { label: "Vaccination tracker", sub: "Schedule, record, share with vets", tailio: "✓", portal: "✗", icon: "💉" },
                  { label: "Legal pet profile", sub: "Proof of ownership on record", tailio: "✓", portal: "✗", icon: "📋" },
                  { label: "Registration cost", sub: "All-inclusive, no surprises", tailio: "₹999", portal: "₹100–500 + effort", icon: "💰" },
                  { label: "If you wait, the fine is…", sub: "Municipal enforcement active now", tailio: "None", portal: "₹10,000+", icon: "⚠️" }
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < 7 ? '1px solid rgba(44, 26, 14, 0.10)' : 'none' }}>
                    <td style={{ padding: '18px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                          width: 34,
                          height: 34,
                          background: '#F3EDE0',
                          borderRadius: 9,
                          outline: '1px solid rgba(44, 26, 14, 0.10)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{ fontSize: 16 }}>{row.icon}</span>
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#2C1A0E', fontSize: '13.5px' }}>{row.label}</div>
                          <div style={{ color: '#A68660', fontSize: 11 }}>{row.sub}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{
                      padding: '18px 24px',
                      textAlign: 'center',
                      background: idx % 2 === 0 ? 'rgba(232, 96, 10, 0.04)' : 'transparent',
                      fontWeight: 700,
                      color: '#2C1A0E'
                    }}>
                      {row.tailio === '✓' ? (
                        <div style={{ width: 28, height: 28, background: '#2C1A0E', borderRadius: 14, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                            <path d="M1.5 5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      ) : row.tailio}
                    </td>
                    <td style={{
                      padding: '18px 24px',
                      textAlign: 'center',
                      color: row.portal === '₹10,000+' ? '#C04E06' : '#A68660',
                      fontWeight: row.portal === '₹10,000+' ? 700 : 400,
                      fontStyle: row.portal === '₹10,000+' ? 'italic' : 'normal'
                    }}>
                      {row.portal === '✗' ? (
                        <div style={{ width: 28, height: 28, border: '1px solid rgba(44, 26, 14, 0.18)', borderRadius: 14, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M1 1L10 10M10 1L1 10" stroke="#A68660" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      ) : row.portal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Features Grid Section */}
      <div style={{
        alignSelf: 'stretch',
        padding: isMobile ? '40px 20px' : '80px 40px',
        background: '#FAF6EF'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 30 }}>
            <div style={{
              display: 'inline-flex',
              padding: '5px 14px',
              background: '#FFF0E4',
              borderRadius: 100,
              outline: '1px solid #FFCCA0',
              marginBottom: 20
            }}>
              <span style={{ color: '#C04E06', fontSize: 10, fontFamily: 'DM Sans', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.20px' }}>
                What you actually get
              </span>
            </div>
            <h2 style={{
              color: '#2C1A0E',
              fontSize: isMobile ? 28 : 40,
              fontFamily: 'Fraunces',
              fontWeight: 900,
              lineHeight: '44px'
            }}>
              Six reasons pet parents <span style={{ color: '#E8600A', fontStyle: 'italic' }}>choose Tailio</span>.
            </h2>
            <p style={{ color: '#7A5C40', fontSize: 14.5, fontFamily: 'DM Sans', maxWidth: 540 }}>
              Every feature was built because a pet parent needed it - not because it looked good in a pitch deck.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: 20
          }}>
            {[
              { title: "Done in 60 seconds flat", desc: "Three fields, four uploads, one click. We've timed it. The average pet parent is done before their chai goes cold.", icon: "⚡" },
              { title: "Legally valid. Always.", desc: "We file directly with MCD, Noida Authority, and GMC. The certificate you receive is the official government-issued document — not a Tailio proxy.", icon: "✓" },
              { title: "Never miss a renewal", desc: "WhatsApp, SMS, and email reminders before your annual expiry. We ping you a week out, three days out, and the day of — you can't forget.", icon: "🔔" },
              { title: "Vaccination tracker built in", desc: "Log every shot, set reminders, and share your pet's health record with any vet — digitally. No paper booklets that get lost in a move.", icon: "💉" },
              { title: "Digital certificate", desc: "Your certificate lives on your Tailio profile — always accessible, never losable. Share it with your RWA, building society, or vet in two taps.", icon: "📄" },
              { title: "Support that actually responds", desc: "Our team responds in under 2 hours — not 2 weeks. Real humans, not automated replies. We're pet parents too.", icon: "💬" }
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: '#FFFCF8',
                borderRadius: 18,
                padding: '26px 24px',
                outline: '1px solid rgba(44, 26, 14, 0.10)'
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  background: '#FFF0E4',
                  borderRadius: 9,
                  outline: '1px solid #FFCCA0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16
                }}>
                  <span style={{ fontSize: 22 }}>{feature.icon}</span>
                </div>
                <h3 style={{ color: '#2C1A0E', fontSize: 16, fontFamily: 'DM Sans', fontWeight: 700, marginBottom: 10 }}>{feature.title}</h3>
                <p style={{ color: '#7A5C40', fontSize: 13, fontFamily: 'DM Sans', lineHeight: '21.45px' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fines Section */}
      <div style={{
        alignSelf: 'stretch',
        padding: isMobile ? '40px 20px' : '80px 40px',
        background: '#2C1A0E',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'inline-flex',
              padding: '5px 14px',
              background: 'rgba(255, 140, 58, 0.12)',
              borderRadius: 100,
              outline: '1px solid rgba(255, 140, 58, 0.20)',
              marginBottom: 20
            }}>
              <span style={{ color: '#FF8C3A', fontSize: 10, fontFamily: 'DM Sans', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.20px' }}>
                Know the fines
              </span>
            </div>
            <h2 style={{
              color: '#FAF6EF',
              fontSize: isMobile ? 28 : 40,
              fontFamily: 'Fraunces',
              fontWeight: 900,
              lineHeight: '44px'
            }}>
              Ignore Registration, Pay the <span style={{ color: '#FF8C3A', fontStyle: 'italic' }}>Penalty</span>
            </h2>
            <p style={{ color: 'rgba(250, 246, 239, 0.55)', fontSize: 14.5, fontFamily: 'DM Sans', maxWidth: 540, margin: '20px auto 0' }}>
              Municipal corporations are actively enforcing registration. These are the current fines across Delhi NCR.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: 20,
            marginBottom: 40
          }}>
            {[
              { city: "Gurugram", amount: "Pending", desc: "Registration strongly encouraged. Fines to be announced — act now.", icon: "🏛️" },
              { city: "Delhi", amount: "₹500+", desc: "Fee enforcement underway. Fines escalating with each MCD drive.", icon: "🏢" },
              { city: "Noida", amount: "₹10,000", desc: "Highest fine in NCR. Noida authority actively penalising non-compliance.", icon: "🏗️" },
              { city: "Ghaziabad", amount: "₹5,000", desc: "Registration fee raised from ₹200 to ₹1,000 in April 2024.", icon: "🏘️" }
            ].map((fine) => (
              <div key={fine.city} style={{
                background: 'rgba(255, 140, 58, 0.08)',
                borderRadius: 18,
                padding: '21px 18px',
                textAlign: 'center',
                outline: '1px solid rgba(255, 140, 58, 0.22)'
              }}>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ color: 'rgba(255, 140, 58, 0.60)', fontSize: 9, fontFamily: 'DM Sans', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.26px' }}>{fine.city}</span>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 40 }}>{fine.icon}</span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ color: fine.amount === 'Pending' ? 'rgba(250, 246, 239, 0.28)' : '#FF8C3A', fontSize: fine.amount === 'Pending' ? 15 : 26, fontFamily: 'Fraunces', fontWeight: 900 }}>
                    {fine.amount}
                  </span>
                </div>
                <p style={{ color: 'rgba(250, 246, 239, 0.38)', fontSize: 11, fontFamily: 'DM Sans', lineHeight: '16.50px' }}>{fine.desc}</p>
              </div>
            ))}
          </div>

          {/* Warning Banner */}
          <div style={{
            background: '#FAF6EF',
            borderRadius: 18,
            padding: '30px 36px',
            position: 'relative',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: 24
          }}>
            <div style={{
              width: 4,
              height: '100%',
              background: 'linear-gradient(180deg, #E8600A 0%, #C04E06 100%)',
              position: 'absolute',
              left: 0,
              top: 0,
              borderTopLeftRadius: 18,
              borderBottomLeftRadius: 18
            }} />
            <div style={{
              width: 48,
              height: 48,
              background: '#FFF0E4',
              borderRadius: 13,
              outline: '1px solid #FFCCA0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: 24 }}>⚠️</span>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: '#2C1A0E', fontSize: 24, fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 700, marginBottom: 10 }}>
                Without proper <span style={{ color: '#C04E06' }}>Registration,</span> your pet may not be legally protected during disputes.
              </h3>
              <p style={{ color: '#7A5C40', fontSize: 13.5, fontFamily: 'DM Sans', lineHeight: '22.28px', marginBottom: 20 }}>
                In disputes or complaints, municipal authorities may seize your pet. An unregistered pet has no legal standing and neither does its owner. Don't wait until it's too late.
              </p>
              <button style={{
                padding: '13px 26px',
                background: '#E8600A',
                boxShadow: '0px 4px 16px rgba(232, 96, 10, 0.28), 0px 2px 0px #C04E06',
                borderRadius: 9,
                border: 'none',
                cursor: 'pointer'
              }}>
                <span style={{ color: 'white', fontSize: 15, fontFamily: 'DM Sans', fontWeight: 600 }}>Register Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{
        alignSelf: 'stretch',
        padding: isMobile ? '40px 20px' : '80px 40px',
        background: '#F3EDE0'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 30 }}>
            <div style={{
              display: 'inline-flex',
              padding: '5px 14px',
              background: '#FFF0E4',
              borderRadius: 100,
              outline: '1px solid #FFCCA0',
              marginBottom: 20
            }}>
              <span style={{ color: '#C04E06', fontSize: 10, fontFamily: 'DM Sans', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.20px' }}>
                Happy pet parents
              </span>
            </div>
            <h2 style={{
              color: '#2C1A0E',
              fontSize: isMobile ? 28 : 40,
              fontFamily: 'Fraunces',
              fontStyle: 'italic',
              fontWeight: 700,
              lineHeight: '44px'
            }}>
              They did it. <span style={{ color: '#E8600A' }}>So can you.</span>
            </h2>
            <p style={{ color: '#7A5C40', fontSize: 14.5, fontFamily: 'DM Sans' }}>
              Pet parents from Delhi NCR who registered with Tailio.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 20
          }}>
            {[
              { name: "Priya Sharma", location: "Dwarka, Delhi", pet: "Bruno", text: '"I had no idea registration was mandatory until my RWA sent a notice. Tailio made it completely painless — done in 5 minutes from my kitchen. Bruno is now officially a Delhi resident!"' },
              { name: "Arjun Mehta", location: "Sector 62, Noida", pet: "Luna", text: '"I tried the Noida Municipal portal first — gave up after 40 minutes of errors. Tailio got it done in one sitting. The digital certificate and QR tag are a bonus I didn\'t expect."' },
              { name: "Sneha Kapoor", location: "Indirapuram, Ghaziabad", pet: "Coco", text: '"The vaccination reminder alone is worth it. I used to forget booster dates all the time. Now Tailio pings me on WhatsApp a week before. My vet loves it too."' }
            ].map((testimonial, idx) => (
              <div key={idx} style={{
                background: '#FFFCF8',
                borderRadius: 18,
                padding: '24px 22px',
                outline: '1px solid rgba(44, 26, 14, 0.10)'
              }}>
                <div style={{ marginBottom: 14 }}>
                  <span style={{ color: '#E8600A', fontSize: 13, fontFamily: 'DM Sans', letterSpacing: 2 }}>★★★★★</span>
                </div>
                <p style={{ color: '#4A2C14', fontSize: 15, fontFamily: 'DM Sans', fontStyle: 'italic', lineHeight: '24px', marginBottom: 20 }}>
                  {testimonial.text}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#2C1A0E', fontSize: 13.5 }}>{testimonial.name}</div>
                    <div style={{ color: '#A68660', fontSize: 11.5 }}>{testimonial.location}</div>
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    background: '#FFF0E4',
                    borderRadius: 100,
                    outline: '1px solid #FFCCA0'
                  }}>
                    <span style={{ color: '#C04E06', fontSize: 12, fontFamily: 'DM Sans', fontWeight: 600 }}>{testimonial.pet}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{
        width: '100%',
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: 'linear-gradient(164deg, #C04E06 0%, #E8600A 60%, #FF8C3A 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{
            color: 'white',
            fontSize: isMobile ? 36 : 58,
            fontFamily: 'Fraunces',
            fontWeight: 900,
            lineHeight: '62.64px',
            marginBottom: 20
          }}>
            Upload Less. <br />Move Faster.
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: 16, fontFamily: 'DM Sans', lineHeight: '26.40px', marginBottom: 30 }}>
            Join thousands of responsible pet parents across Delhi, Noida, Ghaziabad & Gurugram who are already compliant.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button style={{
              padding: '14px 32px',
              background: 'white',
              borderRadius: 9,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
              outline: '2px solid rgba(255, 255, 255, 0.30)'
            }}>
              <span style={{ color: '#C04E06', fontSize: 15, fontFamily: 'DM Sans', fontWeight: 700 }}>Register Your Pet — ₹999 →</span>
            </button>
            <button style={{
              padding: '14px 28px',
              background: 'transparent',
              borderRadius: 9,
              border: '1px solid rgba(255, 255, 255, 0.40)',
              cursor: 'pointer'
            }}>
              <span style={{ color: 'white', fontSize: 15, fontFamily: 'DM Sans', fontWeight: 500 }}>See how it works</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
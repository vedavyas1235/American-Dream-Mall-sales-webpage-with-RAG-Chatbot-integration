import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './EventsPage.css'

const PAST_EVENTS = [
  {
    year: '2024',
    events: [
      { name: 'PAW Patrol Hero Academy', type: 'Family / Brand Activation', venue: 'Nickelodeon Universe', desc: 'Extended Nickelodeon partnership activation featuring immersive PAW Patrol meet-and-greet experiences and themed installations. Ran for 6 weeks.' },
      { name: 'Sesame Street Learn & Play Launch', type: 'Grand Opening / Brand Partnership', venue: 'Court B, Level 1', desc: 'Official opening of the first-ever Sesame Street Learn & Play educational center in a retail setting — a Sesame Workshop partnership.' },
      { name: 'The Gameroom by Hasbro — Launch', type: 'Brand Activation / Grand Opening', venue: 'Court C, Level 1', desc: 'Hasbro\'s first-of-its-kind entertainment center featuring G.I. Joe laser tag, Monopoly-themed experiences, and Transformers activations.' },
      { name: 'Steve Aoki — New Year\'s Eve Live', type: 'Concert', venue: 'Dream Live', desc: 'NYE concert headlined by DJ/producer Steve Aoki. Sold-out crowd of 900+ at Dream Live event space. Part of the Live Nation multi-year partnership.' },
      { name: 'Animal Crossing Aquarium Tour', type: 'Themed Activation', venue: 'SEA LIFE Aquarium', desc: 'Nintendo-themed limited-run event at SEA LIFE Aquarium featuring Animal Crossing branding throughout the aquarium experience.' },
    ],
  },
  {
    year: '2023',
    events: [
      { name: 'Tiësto — Summer Sessions', type: 'Concert', venue: 'Dream Live', desc: 'DJ Tiësto performed live at Dream Live as part of the mall\'s summer entertainment programming in partnership with Live Nation.' },
      { name: 'Pauly D Live Set', type: 'Concert', venue: 'Dream Live / Nickelodeon Universe Stage', desc: 'DJ Pauly D performed in the Nickelodeon Universe entertainment stage, one of the first celebrity DJ performances at the attraction.' },
      { name: 'IFL Cup — Indoor Football', type: 'Sports Event', venue: 'Indoor Arena / Common Area', desc: 'American Dream hosted an indoor football championship event, one of the first major competitive sporting events at the complex.' },
      { name: 'NJ Lottery Rock Paper Scissors Throwdown', type: 'Sponsored Competition', venue: 'The Atrium', desc: 'New Jersey Lottery-sponsored mass-participation competition event — thousands of participants across public and ticketed rounds.' },
      { name: 'American Dream Dance Off', type: 'Community / Competition', venue: 'Dream Live', desc: 'Regional dance competition drawing schools and studios from the tri-state area. Multiple performance categories across one weekend.' },
      { name: 'Prom & Bridal Fest', type: 'Seasonal / Consumer Show', venue: 'Dream Live + The Avenue', desc: 'Annual bridal and prom showcase featuring fashion, beauty, photography, and vendor activations across Dream Live and The Avenue atrium.' },
    ],
  },
  {
    year: '2022',
    events: [
      { name: 'Live Nation Partnership Announcement', type: 'Corporate / Partnership Launch', venue: 'Dream Live', desc: 'American Dream signed a multi-year partnership with Live Nation to anchor its entertainment programming and drive major concert bookings.' },
      { name: 'Ludacris — Live Performance', type: 'Concert', venue: 'Dream Live', desc: 'Rapper Ludacris performed as one of the first major concerts at American Dream under the new Live Nation programming partnership.' },
      { name: 'Lil Tjay Live', type: 'Concert', venue: 'Dream Live', desc: 'NY-based rapper Lil Tjay headlined a sold-out show in Dream Live — part of the inaugural Live Nation entertainment series.' },
      { name: 'Sheck Wes Live', type: 'Concert', venue: 'Dream Live', desc: 'Harlem rapper Sheck Wes performed at Dream Live as part of the inaugural Live Nation-powered concert series.' },
      { name: 'Band-Maid — US Tour Stop', type: 'Concert', venue: 'Dream Live', desc: 'Japanese rock band Band-Maid performed at American Dream in one of the mall\'s first international music acts.' },
      { name: 'LEGOLAND Sensory Hours Launch', type: 'Community / Inclusive Event', venue: 'LEGOLAND Discovery Center', desc: 'Regular sensory-sensitive hours launched for families with autism and sensory-processing needs — part of Merlin\'s global inclusive programming initiative.' },
      { name: 'Piano Showcase Series', type: 'Arts & Culture', venue: 'The Avenue Atrium', desc: 'Monthly rotating piano performance series featuring local schools, conservatories, and professional soloists in The Avenue atrium.' },
    ],
  },
]

const EVENT_TYPES = ['All', 'Concert', 'Brand Activation', 'Sports Event', 'Community', 'Grand Opening']

export default function EventsPage() {
  const [filter, setFilter] = useState('All')
  const [expandedYear, setExpandedYear] = useState<string | null>('2024')
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const allEvents = PAST_EVENTS.flatMap(y => y.events.map(e => ({ ...e, year: y.year })))

  const filtered = filter === 'All'
    ? allEvents
    : allEvents.filter(e => e.type.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="ep">
      {/* Hero */}
      <header className="ep-hero">
        <img
          className="ep-hero__bg"
          src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Concert crowd"
        />
        <div className="ep-hero__overlay" />
        <div className="ep-hero__content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-label">Event Booking</span>
            <h1 className="ep-hero__title">A Stage Unlike<br /><em>Any Other.</em></h1>
            <div className="gold-line" />
            <p className="ep-hero__desc">
              From sold-out concerts and brand launches to galas, corporate events, and
              sensory-friendly family programming — American Dream hosts it all. 40 million
              annual visitors. Six distinct venues. One booking team.
            </p>
            <div className="ep-hero__actions">
              <button className="btn-gold" onClick={() => document.getElementById('ep-events')?.scrollIntoView({ behavior: 'smooth' })}>
                View Past Events →
              </button>
              <button className="btn-outline" onClick={() => navigate('/')}>← Back to Overview</button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats */}
      <div className="ep-stats">
        {[
          { v: '3,000', l: 'Concert Capacity', s: 'Performing arts venue' },
          { v: '900', l: 'Standing — Dream Live', s: '30,000 sq ft flexible space' },
          { v: '6', l: 'Distinct Venues', s: 'From intimate to massive' },
          { v: '40M+', l: 'Annual Visitors', s: 'Built-in event audience' },
          { v: 'Live Nation', l: 'Multi-Year Partner', s: 'Since 2022' },
          { v: '9 mo', l: 'Lead Time Recommended', s: 'For large-scale events' },
        ].map(s => (
          <div key={s.l} className="ep-stat">
            <span className="ep-stat__value">{s.v}</span>
            <span className="ep-stat__label">{s.l}</span>
            <span className="ep-stat__sub">{s.s}</span>
          </div>
        ))}
      </div>

      {/* Past Events Timeline */}
      <section id="ep-events" className="ep-timeline">
        <div className="ep-timeline__inner">
          <div className="ep-timeline__header">
            <span className="section-label">Event History</span>
            <h2 className="lp-section-title">Events That Defined the Venue</h2>
            <p className="lp-section-desc">
              American Dream opened its entertainment programming in 2022. Since then it has hosted
              concerts, brand activations, sporting events, and community programming — all under one roof.
            </p>
          </div>

          {/* Type filters */}
          <div className="ep-filters">
            {EVENT_TYPES.map(t => (
              <button
                key={t}
                className={`ep-filter ${filter === t ? 'ep-filter--active' : ''}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Filtered flat list */}
          {filter !== 'All' ? (
            <div className="ep-event-grid">
              <AnimatePresence>
                {filtered.map(e => (
                  <motion.div
                    key={e.name}
                    className="ep-event-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="ep-event-card__top">
                      <span className="ep-event-card__year">{e.year}</span>
                      <span className="ep-event-card__type">{e.type}</span>
                    </div>
                    <h3 className="ep-event-card__name">{e.name}</h3>
                    <span className="ep-event-card__venue">📍 {e.venue}</span>
                    <p className="ep-event-card__desc">{e.desc}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* Year-grouped accordion when showing all */
            <div className="ep-years">
              {PAST_EVENTS.map(y => (
                <div key={y.year} className="ep-year">
                  <button
                    className={`ep-year__toggle ${expandedYear === y.year ? 'ep-year__toggle--open' : ''}`}
                    onClick={() => setExpandedYear(expandedYear === y.year ? null : y.year)}
                  >
                    <span className="ep-year__label">{y.year}</span>
                    <span className="ep-year__count">{y.events.length} events</span>
                    <span className="ep-year__arrow">{expandedYear === y.year ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {expandedYear === y.year && (
                      <motion.div
                        className="ep-year__events"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="ep-event-grid">
                          {y.events.map(e => (
                            <div key={e.name} className="ep-event-card">
                              <div className="ep-event-card__top">
                                <span className="ep-event-card__year">{y.year}</span>
                                <span className="ep-event-card__type">{e.type}</span>
                              </div>
                              <h3 className="ep-event-card__name">{e.name}</h3>
                              <span className="ep-event-card__venue">📍 {e.venue}</span>
                              <p className="ep-event-card__desc">{e.desc}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <div className="lp-cta__inner">
          <h2 className="lp-cta__title">Book Your Event at American Dream</h2>
          <p className="lp-cta__desc">
            Whether you're planning an intimate gala, a product launch, or a full concert — our event team
            builds custom packages from venue to catering to AV.
          </p>
          <div className="lp-cta__actions">
            <button className="btn-gold" onClick={() => { navigate('/'); setTimeout(() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }), 300) }}>
              Submit Event Inquiry →
            </button>
          </div>
          <div className="lp-cta__contact">
            <span>events@americandream.com</span>
            <span>Recommended lead time: 3–9 months for large events</span>
          </div>
        </div>
      </section>
    </div>
  )
}

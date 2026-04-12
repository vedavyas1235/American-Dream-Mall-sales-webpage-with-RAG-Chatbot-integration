import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './VenuesPage.css'

const VENUES = [
  {
    id: 'dream-live',
    name: 'Dream Live',
    tagline: 'The Premier Event Space',
    type: 'Flexible Event Hall',
    capacity: '900 standing / flexible seated',
    sqft: '30,000 sq ft',
    location: 'Level 1 — East Wing',
    img: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#c9a84c',
    specs: [
      { label: 'Main Hall', value: '30,000 sq ft' },
      { label: 'Art Deco Lobby', value: '4,500 sq ft (bookable separately)' },
      { label: 'Standing Capacity', value: '900 guests' },
      { label: 'Flex Space / Storage', value: '1,200 sq ft' },
      { label: 'Prep / Catering Area', value: '600 sq ft' },
      { label: 'AV', value: 'Video wall (9×55" LCD) + 75" vertical LCDs' },
      { label: 'Box Office', value: 'Built-in' },
      { label: 'Bar & Concessions', value: 'Built-in' },
    ],
    useCases: ['Galas & Award Shows', 'Concerts & DJ Events', 'Corporate Conferences', 'Product Launches', 'Fashion Shows', 'Trade Shows & Exhibitions'],
    lead: '3–9 months recommended',
  },
  {
    id: 'concert-venue',
    name: 'American Dream Concert Venue',
    tagline: 'Live Nation-Powered Performing Arts',
    type: 'Concert / Performing Arts',
    capacity: '3,000 seated',
    sqft: '~50,000 sq ft',
    location: 'Level 2 — West Atrium',
    img: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#b5453a',
    specs: [
      { label: 'Seated Capacity', value: '3,000 guests' },
      { label: 'Stage Size', value: 'Full production stage' },
      { label: 'Booking Partner', value: 'Live Nation (exclusive)' },
      { label: 'AV', value: 'Full concert production rig' },
      { label: 'Backstage', value: 'Artist dressing rooms, green rooms' },
      { label: 'Food & Beverage', value: 'Full concessions network' },
    ],
    useCases: ['Major Concerts', 'Award Shows', 'Performing Arts', 'Comedy Shows', 'Keynote Presentations'],
    lead: '6–12 months for major acts',
  },
  {
    id: 'nickelodeon',
    name: 'Nickelodeon Universe',
    tagline: 'Private Park Buyout Available',
    type: 'Theme Park Experience',
    capacity: 'Up to 5,000+ buyout',
    sqft: '8 acres (indoor)',
    location: 'Level 1 & 2 — Court A',
    img: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#f26522',
    specs: [
      { label: 'Total Space', value: '8 acres indoor' },
      { label: 'Rides & Attractions', value: '35+' },
      { label: 'Entertainment Stage', value: 'Yes — for live shows & DJ' },
      { label: 'Private Party Rooms', value: 'Multiple rooms available' },
      { label: 'F&B', value: 'Multiple dining concepts' },
      { label: 'Buyout Type', value: 'Full park or partial zones' },
    ],
    useCases: ['Corporate Team Building', 'Brand Activations', 'Private Birthday Buyouts', 'School Group Events', 'Product Launch Experiences'],
    lead: 'Private full-park: 6+ months',
  },
  {
    id: 'dreamworks-waterpark',
    name: 'DreamWorks Water Park',
    tagline: 'Luxury Skyboxes & Full Buyout',
    type: 'Indoor Water Park',
    capacity: 'Up to 2,000+ for buyout',
    sqft: '532,000 sq ft',
    location: 'Level 1 — North Wing',
    img: 'https://images.pexels.com/photos/1449934/pexels-photo-1449934.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#00b4d8',
    specs: [
      { label: 'Total Space', value: '532,000 sq ft' },
      { label: 'Water Attractions', value: '40+' },
      { label: 'Cabanas', value: '19 branded cabanas' },
      { label: 'Skyboxes', value: '28 luxury skyboxes' },
      { label: 'Wave Pool', value: 'Yes — largest indoor' },
      { label: 'Lazy River', value: 'Yes' },
      { label: 'F&B', value: 'Multiple poolside concepts' },
      { label: 'Open', value: 'Year-round, climate-controlled' },
    ],
    useCases: ['Corporate Summer Events', 'Brand Experience Days', 'Charity Galas', 'TV / Film Production', 'Private Group Experiences'],
    lead: '3–6 months for full buyout',
  },
  {
    id: 'big-snow',
    name: 'Big SNOW',
    tagline: 'North America\'s Only Indoor Ski Slope',
    type: 'Indoor Ski Resort',
    capacity: 'Private slope booking available',
    sqft: '180,000 sq ft',
    location: 'Level 1 — West Wing',
    img: 'https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#4a9eff',
    specs: [
      { label: 'Total Space', value: '180,000 sq ft of real snow' },
      { label: 'Ski Runs', value: '12 runs' },
      { label: 'Open', value: '365 days / year' },
      { label: 'Temperature', value: '28°F (−2°C) year-round' },
      { label: 'Activities', value: 'Skiing, snowboarding, snow tubing, lessons' },
      { label: 'Rental', value: 'Full equipment rental available' },
      { label: 'Lodge', value: 'Alpine-themed lodge & café' },
    ],
    useCases: ['Corporate Team Building', 'Brand Shoots & Film Production', 'Exclusive Private Ski Days', 'Après-Ski Brand Activations', 'Winter Campaign Launches'],
    lead: 'Private events: 2–4 months',
  },
  {
    id: 'the-rink',
    name: 'The Rink',
    tagline: 'Year-Round Indoor Ice Skating',
    type: 'Ice Skating Rink',
    capacity: '200 skaters / viewing parties',
    sqft: '~18,000 sq ft ice surface',
    location: 'Level 1 — Central Atrium',
    img: 'https://images.pexels.com/photos/1598510/pexels-photo-1598510.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#d4af37',
    specs: [
      { label: 'Ice Surface', value: '~18,000 sq ft' },
      { label: 'Open', value: 'Year-round' },
      { label: 'Viewing Area', value: 'Surrounding atrium with seating' },
      { label: 'F&B', value: 'Adjacent café & bar' },
      { label: 'Rental', value: 'Skate rental available' },
      { label: 'Shows', value: 'Ice shows & skating performances possible' },
    ],
    useCases: ['Private Ice Parties', 'Skating Performances & Shows', 'Brand Activations', 'Corporate Skate-A-Thons', 'Holiday Seasonal Events'],
    lead: 'Private bookings: 1–3 months',
  },
  {
    id: 'sealife',
    name: 'SEA LIFE Aquarium',
    tagline: 'Unique Private Event Backdrop',
    type: 'Aquarium Experience',
    capacity: 'Up to 500 for private events',
    sqft: '~25,000 sq ft',
    location: 'Level 1 — East Wing',
    img: 'https://images.pexels.com/photos/3894157/pexels-photo-3894157.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#00897b',
    specs: [
      { label: 'Marine Species', value: '200+' },
      { label: 'Underwater Tunnel', value: '360° walkthrough tunnel' },
      { label: 'Touch Pool', value: 'Yes' },
      { label: 'Educational Programs', value: 'K-12 field trips & STEAM' },
      { label: 'Private Capacity', value: 'Up to 500 guests' },
      { label: 'Operator', value: 'Merlin Entertainments (global)' },
    ],
    useCases: ['Premium Corporate Dinners', 'Charity Galas Under the Sea', 'Product Launches', 'Film & Photography Shoots', 'Education & Brand Partnerships'],
    lead: 'Private events: 2–4 months',
  },
]

export default function VenuesPage() {
  const [activeVenue, setActiveVenue] = useState(VENUES[0].id)
  const navigate = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const venue = VENUES.find(v => v.id === activeVenue) || VENUES[0]

  return (
    <div className="vp">
      {/* Hero */}
      <header className="vp-hero">
        <img
          className="vp-hero__bg"
          src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Venue interior"
        />
        <div className="vp-hero__overlay" />
        <div className="vp-hero__content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="section-label">Venue Directory</span>
            <h1 className="vp-hero__title">Seven Venues.<br /><em>One Destination.</em></h1>
            <div className="gold-line" />
            <p className="vp-hero__desc">
              From a 3,000-seat concert hall to the world's only indoor ski resort,
              American Dream has a venue for every event. All climate-controlled.
              All accessible from direct NYC transit. All backed by 40 million visitors per year.
            </p>
            <div className="vp-hero__actions">
              <button className="btn-gold" onClick={() => document.getElementById('vp-main')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Venues →
              </button>
              <button className="btn-outline" onClick={() => navigate('/')}>← Back to Overview</button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Venue selector */}
      <section id="vp-main" className="vp-main">
        {/* Sidebar */}
        <div className="vp-sidebar">
          {VENUES.map(v => (
            <button
              key={v.id}
              className={`vp-sidebar__item ${activeVenue === v.id ? 'vp-sidebar__item--active' : ''}`}
              style={{ '--v-color': v.accent } as React.CSSProperties}
              onClick={() => setActiveVenue(v.id)}
            >
              <span className="vp-sidebar__name">{v.name}</span>
              <span className="vp-sidebar__type">{v.type}</span>
              <span className="vp-sidebar__cap">{v.capacity}</span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={venue.id}
            className="vp-detail"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4 }}
          >
            {/* Image */}
            <div className="vp-detail__img-wrap">
              <img src={venue.img} alt={venue.name} className="vp-detail__img" />
              <div className="vp-detail__img-overlay" style={{ background: `linear-gradient(to right, rgba(8,8,8,0.0) 0%, rgba(8,8,8,0.8) 100%)` }} />
              <div className="vp-detail__img-badge" style={{ background: venue.accent }}>
                {venue.type}
              </div>
            </div>

            {/* Info */}
            <div className="vp-detail__info">
              <div className="vp-detail__meta">
                <span className="vp-detail__location">📍 {venue.location}</span>
              </div>
              <h2 className="vp-detail__name" style={{ color: venue.accent }}>{venue.name}</h2>
              <p className="vp-detail__tagline">{venue.tagline}</p>
              <div className="gold-line" />

              <div className="vp-detail__key-stats">
                <div><span>{venue.sqft}</span>Total Space</div>
                <div><span>{venue.capacity}</span>Capacity</div>
                <div><span>{venue.lead}</span>Lead Time</div>
              </div>

              {/* Specs table */}
              <h3 className="vp-detail__specs-title">Technical Specifications</h3>
              <div className="vp-detail__specs">
                {venue.specs.map(s => (
                  <div key={s.label} className="vp-detail__spec-row">
                    <span className="vp-detail__spec-label">{s.label}</span>
                    <span className="vp-detail__spec-value">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Use cases */}
              <h3 className="vp-detail__specs-title">Ideal For</h3>
              <div className="vp-detail__uses">
                {venue.useCases.map(u => (
                  <span key={u} className="vp-detail__use-tag" style={{ borderColor: venue.accent }}>
                    {u}
                  </span>
                ))}
              </div>

              <button
                className="btn-gold"
                style={{ background: venue.accent, border: 'none', marginTop: '24px', width: '100%' }}
                onClick={() => { navigate('/'); setTimeout(() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }), 300) }}
              >
                Book {venue.name} →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  )
}

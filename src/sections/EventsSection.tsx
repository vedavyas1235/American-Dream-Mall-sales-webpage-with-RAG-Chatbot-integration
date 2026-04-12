import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './EventsSection.css'

const EVENTS = [
  {
    title: 'Concerts & Live Performances',
    img: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=85&auto=format&fit=crop',
    desc: 'American Dream\'s central hall and dedicated performance spaces have hosted Grammy-nominated artists, New Year\'s Eve spectaculars, and sold-out live events drawing tens of thousands.',
  },
  {
    title: 'Brand Activations',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85&auto=format&fit=crop',
    desc: 'Fortune 500 brands have activated inside the property — from pop-up retail experiences to immersive product launches. Foot traffic of 40M+ means your activation reaches an audience no arena can offer.',
  },
  {
    title: 'Celebrity Appearances & Signings',
    img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=85&auto=format&fit=crop',
    desc: 'American Dream has welcomed A-list talent for exclusive signing events, holiday appearances, and content creation campaigns that generate massive earned media and social engagement.',
  },
  {
    title: 'Corporate Events & Buyouts',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=85&auto=format&fit=crop',
    desc: 'From private buyouts of Nickelodeon Universe to exclusive seated galas in The Avenue, American Dream offers unmatched corporate event settings unavailable anywhere else in the tri-state area.',
  },
]

const EVENT_SPACES = [
  { name: 'The Grand Hall', capacity: '5,000+', type: 'Concerts · Galas · Expos' },
  { name: 'Retail Activation Zones', capacity: 'Flexible', type: 'Pop-Ups · Product Launches' },
  { name: 'Nickelodeon Universe (Buyout)', capacity: '3,000', type: 'Corporate Events · Parties' },
  { name: 'DreamWorks Water Park (Buyout)', capacity: '2,500', type: 'Private Experiences' },
  { name: 'The Avenue (Evening Events)', capacity: '800', type: 'Luxury Galas · Brand Dinners' },
]

export default function EventsSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="events" className="events-section" ref={ref}>
      <div className="events-section__inner">
        {/* Header */}
        <div className="events-section__header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Events & Platform
          </motion.span>
          <motion.h2
            className="events-section__title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            A Global Platform.<br />
            <em>Not Just a Building.</em>
          </motion.h2>
          <div className="gold-line" />
          <motion.p
            className="events-section__desc"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            American Dream isn't just a place to shop — it's a media platform with a building.
            With 40 million annual visitors, best-in-class event infrastructure, and the ability
            to activate across multiple venues simultaneously, this is the most powerful stage
            in the Northeast United States.
          </motion.p>
        </div>

        {/* Events grid */}
        <div className="events-grid">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.title}
              className="event-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="event-card__img-wrap">
                <img src={event.img} alt={event.title} loading="lazy" />
                <div className="event-card__img-overlay" />
                <h3 className="event-card__title">{event.title}</h3>
              </div>
              <div className="event-card__body">
                <p>{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Venue table */}
        <motion.div
          className="events-venues"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <h3 className="events-venues__title">
            <span className="section-label" style={{ marginBottom: 8 }}>Venue Directory</span>
            Available Spaces & Capacities
          </h3>
          <div className="events-venues__table">
            {EVENT_SPACES.map((space, i) => (
              <div key={space.name} className="events-venue-row">
                <span className="events-venue-row__num">0{i + 1}</span>
                <span className="events-venue-row__name">{space.name}</span>
                <span className="events-venue-row__cap">{space.capacity} guests</span>
                <span className="events-venue-row__type">{space.type}</span>
                <button
                  className="events-venue-row__btn"
                  onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Inquire
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* KPIs */}
        <motion.div
          className="events-kpis"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {[
            { v: '200+', l: 'Events Hosted Annually' },
            { v: '40M+', l: 'Audience Reach Per Year' },
            { v: '$2.4M', l: 'Avg. Brand Activation ROI' },
            { v: '5K+', l: 'Max Event Capacity' },
          ].map(k => (
            <div key={k.l} className="events-kpi">
              <span className="events-kpi__value">{k.v}</span>
              <span className="events-kpi__label">{k.l}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

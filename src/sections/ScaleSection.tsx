import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './ScaleSection.css'

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatCard({
  value, suffix, label, description, delay, inView,
}: {
  value: number; suffix: string; label: string; description: string; delay: number; inView: boolean
}) {
  const count = useCountUp(value, 2, inView)
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="stat-card__value">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="stat-card__label">{label}</div>
      <div className="stat-card__desc">{description}</div>
    </motion.div>
  )
}

const STATS = [
  { value: 3, suffix: '.5M', label: 'Square Feet', description: 'Largest mall in North America by total area', delay: 0 },
  { value: 40, suffix: 'M+', label: 'Annual Visitors', description: 'Outpacing major US theme parks in foot traffic', delay: 0.1 },
  { value: 450, suffix: '+', label: 'Stores & Restaurants', description: 'From flagship luxury to beloved food destinations', delay: 0.2 },
  { value: 16, suffix: '', label: 'Major Attractions', description: 'The only mall in America with an indoor ski slope', delay: 0.3 },
  { value: 14, suffix: 'mi', label: 'From Midtown Manhattan', description: 'Serving 20M people in the NY/NJ metro area', delay: 0.4 },
  { value: 2019, suffix: '', label: 'Year Opened', description: 'The most anticipated commercial opening in decades', delay: 0.5 },
]

export default function ScaleSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="scale" className="scale-section" ref={ref}>
      <div className="scale-section__inner">
        <div className="scale-section__header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Why American Dream
          </motion.span>

          <motion.h2
            className="scale-section__title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            The Numbers That<br />
            <em>Redefine the Category</em>
          </motion.h2>

          <div className="gold-line" />

          <motion.p
            className="scale-section__desc"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            American Dream isn't just the largest mall in North America — it's a new class of property entirely.
            A mixed-use destination that combines retail, entertainment, hospitality, and live events at a scale
            that no other address in the Western Hemisphere can match.
          </motion.p>
        </div>

        <div className="scale-section__stats">
          {STATS.map(stat => (
            <StatCard key={stat.label} {...stat} inView={inView} />
          ))}
        </div>

        {/* Map / Location visual */}
        <motion.div
          className="scale-section__location"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <div className="scale-section__location-text">
            <span className="section-label">Catchment Area</span>
            <h3>20 Million People Within 30 Miles</h3>
            <div className="gold-line" />
            <p>
              Positioned at the intersection of I-95 and NJ Turnpike, American Dream sits at the heart
              of the most densely populated, highest-income corridor in the United States. Serviced by
              NJ Transit and direct shuttles from Port Authority, the property is accessible to all of
              Metro New York — and visitors from 50+ countries annually.
            </p>
            <ul className="scale-section__location-list">
              <li><span className="dot" />14 miles from Midtown Manhattan</li>
              <li><span className="dot" />Direct transit via NJ Transit & shuttle</li>
              <li><span className="dot" />Adjacent to MetLife Stadium</li>
              <li><span className="dot" />Average household income: $104,000+</li>
              <li><span className="dot" />International visitors from 50+ countries</li>
            </ul>
          </div>
          <div className="scale-section__map">
            <img
              src="/american-dream-exterior.jpg"
              alt="American Dream Mall — East Rutherford, NJ"
              loading="lazy"
            />
            <div className="scale-section__map-caption">
              American Dream · East Rutherford, NJ
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

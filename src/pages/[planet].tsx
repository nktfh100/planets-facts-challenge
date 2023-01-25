import Image from 'next/image'
import styles from '@/styles/Planet.module.scss'
import { useAppStore } from '@/store/store'
import { useRouter } from 'next/router'
import { PlanetData, PlanetInfoType } from '@/types'
import Link from 'next/link'
import DesktopNavBtn from '@/components/nav-btns/desktop/DesktopNavBtn'
import MobileNavBtn from '@/components/nav-btns/mobile/MobileNavBtn'
import { motion } from 'framer-motion'

export default function Planet() {

  const router = useRouter();

  const planetData: PlanetData = useAppStore((state) => state.activePlanetData);

  const activeInfoType: "overview" | "structure" | "geology" = router.query.infoType as any || "overview";

  const infoData: PlanetInfoType = planetData ? planetData[activeInfoType] : { content: "", source: "" }

  return (
    <div className={styles['planet']}>

      <nav className={styles['mobile-info-nav']}>
        <ul>
          <MobileNavBtn title={'Overview'} target={'overview'} activeColor={planetData?.color} />
          <MobileNavBtn title={'Structure'} target={'structure'} activeColor={planetData?.color} />
          <MobileNavBtn title={'Surface'} target={'geology'} activeColor={planetData?.color} />
        </ul>
      </nav>

      <div className={styles['top-section']}>

        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} key={planetData?.name + activeInfoType + "img"} className={styles['left-section']}>
          <Image width={290} height={290} src={activeInfoType == "structure" ? planetData?.images.internal : planetData?.images.planet} alt={planetData?.name} />
          <Image width={326} height={398} className={`${styles['geology-img']} ${activeInfoType == "geology" && styles['geology-img-active']}`} src={planetData?.images.geology} alt="planet surface" />
        </motion.div>

        <div className={styles['right-section']}>
          <div className={styles['info-container']}>
            <motion.h1 initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={planetData?.name + "h1"} className={styles['planet-name']}>{planetData?.name}</motion.h1>
            <motion.p initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.05 } }} key={planetData?.name + "p"} className={styles['info-content']}>{infoData?.content}</motion.p>
            <div className={styles['source-container']}>
              <p>Source:</p>
              <Link href={infoData?.source}>Wikipedia</Link>
              <Image width={11} height={11} src={"/icon-source.svg"} alt={''} />
            </div>
          </div>

          <nav className={styles['info-desktop-nav']}>
            <ul>
              <DesktopNavBtn title={'Overview'} target={'overview'} i={1} activeColor={planetData?.color} />
              <DesktopNavBtn title={'Internal Structure'} target={'structure'} i={2} activeColor={planetData?.color} />
              <DesktopNavBtn title={'Surface Geology'} target={'geology'} i={3} activeColor={planetData?.color} />
            </ul>
          </nav>
        </div>
      </div>

      <div className={styles['stats-container']}>
        <ul>
          <PlanetStat title={"ROTATION TIME"} value={planetData.rotation} />
          <PlanetStat title={"REVOLUTION TIME"} value={planetData.revolution} />
          <PlanetStat title={"RADIUS"} value={planetData.radius} />
          <PlanetStat title={"AVERAGE TEMP."} value={planetData.temperature} />
        </ul>
      </div>
    </div >
  )
}

function PlanetStat({ title, value }: { title: string, value: string }) {
  return (
    <li className={styles['planet-stat']}>
      <h4>{title}</h4>
      <motion.h2 key={value} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{value}</motion.h2>
    </li>
  )
}
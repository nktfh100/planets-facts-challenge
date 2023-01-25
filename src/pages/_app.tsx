import Layout from '@/components/Layout'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Antonio, League_Spartan } from '@next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppStore } from '@/store/store'
import planetsData from "@/data.json"
import { PlanetData } from '@/types'

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '500']
});

const spartan = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '700']
});

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const storeSetPlanetData = useAppStore((state) => state.setPlanetData)

  useEffect(() => {
    if (!router.query.planet) return

    const planetData: PlanetData = planetsData.find((ele) => ele.name.toLowerCase() === router.query.planet) as any;

    if (!planetData) {
      router.push(planetsData[0].name.toLowerCase())
    }

    storeSetPlanetData(planetData);

  }, [router.query.planet, storeSetPlanetData])

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${spartan.style.fontFamily};
        }
        h1, h2 {
          font-family: ${antonio.style.fontFamily};
        }
        h3, h4 {
          font-family: ${spartan.style.fontFamily};
        }
        `}</style>
      <Head>
        <title>Planets Facts</title>
        <meta name="description" content="Planets Facts website challenge" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

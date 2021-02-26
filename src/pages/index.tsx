import { CompletedChallenges } from '../Components/CompletedChallenges';
import { ExperienceBar } from '../Components/ExperienceBar';
import { Profile } from '../Components/Profile';
import { Countdown } from '../Components/Countdown';
import { ChallengeBox } from '../Components/ChallengeBox';
import { ChallengesProvider} from '../contexts/ChallengesContext';

import { GetServerSideProps} from 'next'

import {CountdownProvider} from '../contexts/CountdownContext'

import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';


interface HomeProps{
       level:number;
      currentExperience: number;
      challengeCompleted: number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider level={props.level}
     currentExperience={props.currentExperience}
      challengeCompleted={props.challengeCompleted} 
      
      >
    <div className={styles.container}>
      <Head>
        <title>Inicio | Move.it</title>
      </Head>

      <ExperienceBar />

      <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
      </CountdownProvider>
    </div>
    </ChallengesProvider>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx)=>{



  const {level, currentExperience, challengeCompleted} = ctx.req.cookies;

  

  return{
    props:{
      level:Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted)
    }
  }

}

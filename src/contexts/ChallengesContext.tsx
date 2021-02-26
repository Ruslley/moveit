import { createContext, useState, ReactNode,useEffect } from 'react';
import Cookie from 'js-cookie'
import challenges from '../../challenges.json';
import { LevelUpModal } from '../Components/LevelUpModal';

interface challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  experienceToNextLevel: number;
  activechallenge: challenge;
  levelUp: () => void;
  startNewChallenge: () => void;   
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;

}

interface ChallengesProviderProps {
  children: ReactNode;
  level:number;
  currentExperience: number;
  challengeCompleted: number;
}



export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 0);
  const [currentExperience, setCurrenteExperience] = useState(rest.currentExperience ?? 1);
  const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);
  const [activechallenge, setActiveChallenge] = useState(null);

  const [isLeveUpModalOpen, setIsLeveModalOpne] = useState(false);



  const experienceToNextLevel = Math.pow((level + 1 ) * 4,2 )

  function levelUp(): void {
    setLevel(level + 1);
    setIsLeveModalOpne(true);
  }


   //Função para pedir permissão para enviar notificação ao usuário.
   useEffect(()=>{
    Notification.requestPermission();
  },[])


  function closeLevelUpModal(){ 
    setIsLeveModalOpne(false);
  }

  useEffect(()=>{
    Cookie.set('level',String(level));
    Cookie.set('currentExperience',String(currentExperience));
    Cookie.set('challengeCompleted',String(challengeCompleted));
    



  },[level, currentExperience,challengeCompleted])

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){

      new Notification('Novo Desafio 🚀️',{
        body: `Valendo ${challenge.amount}xp!`
      })
    }


  }

  function completeChallenge(){

    if(!activechallenge){
      return;
    }
    
    const {amount} = activechallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
      }

      setCurrenteExperience(finalExperience);
      setActiveChallenge(null);
      setChallengeCompleted(challengeCompleted + 1)
  }

    function resetChallenge(){

      setActiveChallenge(null);
    }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengeCompleted,
        levelUp,
        startNewChallenge,
        activechallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal

      }}
    >
      {children}
     { isLeveUpModalOpen && <LevelUpModal/>}
    </ChallengesContext.Provider>
  );
}

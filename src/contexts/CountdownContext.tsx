import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountDown: ()=> void;
  resetCountDown: ()=> void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let CountdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60); //convertendo os minutos em segundos
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  //truncando o time.
  const seconds = time % 60;
  //Pegando o restante da divisão. 
 
 

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(CountdownTimeout);
    setIsActive(false);
    setTime(0.2 * 60);
    setHasFinished(false)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      CountdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountDown,
        resetCountDown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}

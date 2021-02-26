import styles from '../styles/components/ChallengeBox.module.css';
import { ChallengesContext} from '../contexts/ChallengesContext';
import { useContext} from  'react';
import { CountdownContext} from  '../contexts/CountdownContext'


export function ChallengeBox() {

  const {activechallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
  const { resetCountDown} = useContext(CountdownContext);

  function handleChallengeSucceeded(){
    completeChallenge();
    resetCountDown();

  }
  function handleChallengeFailed(){

    resetChallenge();
    resetCountDown();

  }
  

  return (
    <div className={styles.challengeBoxContainer}>

      {activechallenge? (
        <div className={styles.challengeActive}>

        <header>Ganhe {activechallenge.amount} xp</header>

        <main>
          <img src={`icons/${activechallenge.type}.svg`} />
          <strong>Novo desafio</strong>
          <p>{activechallenge.description}</p>
        </main>
        <footer>
          <button type="button"
          className={styles.challengeFailedButton}
          onClick={handleChallengeFailed}
          >
            Falhei
          </button>
          <button type="button"
          className={styles.challengeSucceedButton}
          onClick={handleChallengeSucceeded}
          >
            Completei
          </button>
        </footer>

        </div>
      ):(
         <div className={styles.challengeNotActive}>
         <strong>
          Finalize um ciclo para receber um desafio
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios.
          </p>
       
       </div>
      )}
     
    </div>
  );
}

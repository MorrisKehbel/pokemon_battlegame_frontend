import { useState, useRef, useEffect, useCallback } from "react";
import { loadFight, saveFight, clearFight } from "../utils/fightStorage";
import { usePlayer } from "../context";
import { signout } from "../data/auth";
import { updateLeaderboard } from "../data/leaderboard";

export function useBattleLogic(playerTeam = [], enemyTeam = [], tick = 1000) {
  const { user, setUser } = usePlayer();

  const saved = loadFight();

  const [playerIdx, setPlayerIdx] = useState(saved?.playerIdx ?? 0);
  const [enemyIdx, setEnemyIdx] = useState(saved?.enemyIdx ?? 0);

  const [playerHP, setPlayerHP] = useState(saved?.playerHP ?? []);
  const [enemyHP, setEnemyHP] = useState(saved?.enemyHP ?? []);

  const [isRunning, setIsRunning] = useState(false);
  const [roundOver, setRoundOver] = useState(saved ? saved.roundOver : true);

  const [playerHit, setPlayerHit] = useState(0);
  const [enemyHit, setEnemyHit] = useState(0);

  const [winner, setWinner] = useState(saved?.winner ?? null);
  // const [kills, setKills] = useState(0);
  const [allDefeated, setAllDefeated] = useState(false);

  const pHpRef = useRef(playerHP);
  const eHpRef = useRef(enemyHP);
  const pIdxRef = useRef(playerIdx);
  const eIdxRef = useRef(enemyIdx);

  const dmg = (p) => p.pokemon.stats[1].base_stat;

  useEffect(() => {
    if (playerTeam.length !== 6 || enemyTeam.length === 0) return;

    if (playerHP.length === 0 || enemyHP.length === 0) {
      const initP = playerTeam.map(({ pokemon }) => pokemon.stats[0].base_stat);
      const initE = enemyTeam.map(({ pokemon }) => pokemon.stats[0].base_stat);

      setPlayerHP(initP);
      pHpRef.current = initP;
      setEnemyHP(initE);
      eHpRef.current = initE;

      setPlayerIdx(0);
      pIdxRef.current = 0;
      setEnemyIdx(0);
      eIdxRef.current = 0;

      setWinner(null);
      // setKills(0);
      setAllDefeated(false);
      setRoundOver(true);
    }
  }, [playerTeam, enemyTeam]);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(async () => {
      const pIdx = pIdxRef.current;
      const eIdx = eIdxRef.current;

      const hitP = dmg(enemyTeam[eIdx]);
      const hitE = dmg(playerTeam[pIdx]);

      pHpRef.current[pIdx] -= hitP;
      eHpRef.current[eIdx] -= hitE;

      setPlayerHP([...pHpRef.current]);
      setEnemyHP([...eHpRef.current]);

      setPlayerHit(hitP);
      setEnemyHit(hitE);
      setTimeout(() => setPlayerHit(0), 600);
      setTimeout(() => setEnemyHit(0), 600);

      const pKo = pHpRef.current[pIdx] <= 0;
      const eKo = eHpRef.current[eIdx] <= 0;

      if (eKo) {
        const newScore = user.score + 100;
        const enemyNames = enemyTeam.map(({ pokemon }) => pokemon.name);

        try {
          await updateLeaderboard(user._id, {
            username: user.username,
            team: user.team,
            enemy: enemyNames,
            score: newScore,
          });
          setUser({ ...user, score: newScore });
          // setKills((k) => k + 1);
        } catch (err) {
          console.error("Leaderboard‑Update failed:", err);
        }
      }

      if (pKo || eKo) {
        clearInterval(id);
        setIsRunning(false);
        setRoundOver(true);

        if (pKo && pIdx + 1 >= playerTeam.length) {
          setWinner("enemy");
        } else if (eKo && eIdx + 1 >= enemyTeam.length) {
          setWinner("player");
        }
        if (pKo) {
          const next = pIdx + 1;
          pIdxRef.current = next;
          setPlayerIdx(next);
          if (next >= playerTeam.length) setWinner("enemy");
        }
        if (eKo) {
          const next = eIdx + 1;
          eIdxRef.current = next;
          setEnemyIdx(next);

          if (next >= enemyTeam.length) {
            setWinner("player");
            setAllDefeated(true);
          }
        }
      }
    }, tick);

    return () => clearInterval(id);
  }, [isRunning, playerTeam, enemyTeam, tick, user, setUser]);

  const startRound = useCallback(() => {
    if (!roundOver || allDefeated) return;
    setRoundOver(false);
    setIsRunning(true);
  }, [roundOver, allDefeated]);

  useEffect(() => {
    if (playerTeam.length !== 6 || enemyTeam.length === 0) return;

    saveFight({
      playerIdx: pIdxRef.current,
      enemyIdx: eIdxRef.current,
      playerHP: pHpRef.current,
      enemyHP: eHpRef.current,
      roundOver,
      winner,
    });
  }, [
    playerHP,
    enemyHP,
    playerIdx,
    enemyIdx,
    roundOver,
    winner,
    playerTeam.length,
    enemyTeam.length,
  ]);

  return {
    playerIdx,
    enemyIdx,
    playerHP,
    enemyHP,
    playerHit,
    enemyHit,
    isRunning,
    roundOver,
    allDefeated,
    // kills,
    winner,
    startRound,

    resetFight: async () => {
      await signout();
      clearFight();
      window.location.reload();
    },

    newBattle: () => {
      clearFight();
      setPlayerHP([]);
      setEnemyHP([]);
      setPlayerIdx(0);
      setEnemyIdx(0);
      // setKills(0);
      setAllDefeated(false);
      setRoundOver(true);
      setIsRunning(false);
      setWinner(null);
    },
  };
}

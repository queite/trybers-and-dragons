import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  constructor(protected player1: Fighter, protected player2: Fighter) {
    super(player1);
  }

  fight(): number {
    while (this.player1.lifePoints > 0 && this.player2.lifePoints > 0) {
      this.player1.attack(this.player2);
      this.player2.attack(this.player1);
    }
    // Se retorna 1 o player1 venceu, se retorna -1 o vencedor é o player 2
    return this.player1.lifePoints > 0 ? 1 : -1;
  }
}
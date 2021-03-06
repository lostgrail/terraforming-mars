import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";
import { CardType } from "../CardType";
import { Player } from "../../Player";
import { Game } from "../../Game";
import { SelectCard } from '../../inputs/SelectCard';

export class SponsoredAcademies implements IProjectCard {
    public cost: number = 9;
    public tags: Array<Tags> = [Tags.EARTH, Tags.SCIENCE];
    public name: string = "Sponsored Academies";
    public cardType: CardType = CardType.AUTOMATED;
    public hasRequirements = false;
    public canPlay(player: Player): boolean {
        return player.cardsInHand.length > 1; //this card and at least another
    }

    private allDraw(game: Game) {
        for (let player of game.getPlayers()) {
            player.cardsInHand.push(game.dealer.dealCard());
        }
    }

    public play(player: Player, game: Game) {
        return new  SelectCard(
            'Select 1 card to discard',
            player.cardsInHand.filter((c) => c.name !== this.name),
            (foundCards: Array<IProjectCard>) => {
              player.cardsInHand.splice(player.cardsInHand.indexOf(foundCards[0]), 1);
              game.dealer.discard(foundCards[0]);
              this.allDraw(game);
              player.cardsInHand.push(game.dealer.dealCard());
              player.cardsInHand.push(game.dealer.dealCard());
              return undefined;
            }
        );    
    }
    public getVictoryPoints() {
        return 1;
    } 
}
import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";
import { CardType } from "../CardType";
import { Player } from "../../Player";
import { Game } from "../../Game";
import { ResourceType } from "../../ResourceType";


export class AerosportTournament implements IProjectCard {
    public cost: number = 7;
    public tags: Array<Tags> = [];
    public name: string = "Aerosport Tournament";
    public cardType: CardType = CardType.EVENT;
    public canPlay(player: Player): boolean {
        return player.getResourceCount(ResourceType.FLOATER) >= 5;
    }
    public play(player: Player, game: Game) {
        player.megaCredits += game.getCitiesInPlay();
        return undefined;
    }
    
    public getVictoryPoints() {
        return 1;
    } 
}
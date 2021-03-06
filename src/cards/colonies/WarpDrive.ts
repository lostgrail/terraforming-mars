import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";
import { CardType } from '../CardType';
import { Player } from "../../Player";
import { CardName } from '../../CardName';
import { Game } from '../../Game';

export class WarpDrive implements IProjectCard {
    public cost: number = 14;
    public tags: Array<Tags> = [Tags.SCIENCE];
    public name: string = CardName.WARP_DRIVE;
    public cardType: CardType = CardType.AUTOMATED;

    public getCardDiscount(_player: Player, _game: Game, card: IProjectCard) {
        if (card.tags.indexOf(Tags.SPACE) !== -1) {
            return 4;
        }
        return 0;
    }

    public canPlay(player: Player): boolean {
        return player.getTagCount(Tags.SCIENCE) >= 5;
    }

    public play() {
      return undefined;
    }

    public getVictoryPoints() {
        return 2;
    }
}
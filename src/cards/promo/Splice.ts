import { Tags } from "../Tags";
import { Player } from "../../Player";
import { Game } from "../../Game";
import { IProjectCard } from "../IProjectCard";
import { CorporationCard } from '../corporation/CorporationCard';
import { CorporationName } from '../../CorporationName';
import { SelectOption } from "../../inputs/SelectOption";
import { OrOptions } from "../../inputs/OrOptions";
import { ResourceType } from "../../ResourceType";

export class Splice implements CorporationCard {
    public name: string = CorporationName.SPLICE;
    public tags: Array<Tags> = [Tags.MICROBES];
    public startingMegaCredits: number = 48; // 44 + 4 as card resolution when played

    public initialAction(player: Player, game: Game) {
        player.cardsInHand.push(game.drawCardsByTag(Tags.MICROBES, 1)[0]);
        return undefined;
    }

    public onCardPlayed(player: Player, game: Game, card: IProjectCard) {
        if (card.tags.indexOf(Tags.MICROBES) === -1) {return undefined;}

        const addResource = new SelectOption("Add a microbe resource to this card", () => {
            player.addResourceTo(card);
            return undefined;
        });

        const getMegacredits = new SelectOption("Get 2 MC", () => {
            player.megaCredits += 2;
            return undefined;
        });

        // Splice owner get 2MC
        game.getCardPlayer(this.name).megaCredits += 2;

        // Card player choose between 2 MC and a microbe on card, if possible
        if (card.resourceType !== undefined && card.resourceType === ResourceType.MICROBE) {
            return new OrOptions(addResource, getMegacredits);
        } else {
            player.megaCredits += 2;
            return undefined;
        }    
    }

    public play() {
        return undefined;
    }
}

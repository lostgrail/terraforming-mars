import {ICard} from './ICard';

import { Player } from "../Player";
import { Game } from "../Game";
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { OrOptions } from "../inputs/OrOptions";
import { SelectSpace } from "../inputs/SelectSpace";
import { SelectCard } from "../inputs/SelectCard";
import { SelectOption } from "../inputs/SelectOption";
import { ISpace } from "../ISpace";
import { PlayerInput } from "../PlayerInput";
import { ResourceType } from '../ResourceType';

export class LargeConvoy implements IProjectCard {
    public cost: number = 36;
    public tags: Array<Tags> = [Tags.EARTH, Tags.SPACE];
    public name: string = "Large Convoy";
    public cardType: CardType = CardType.EVENT;

    public play(player: Player, game: Game): PlayerInput | undefined {
        player.cardsInHand.push(game.dealer.dealCard(), game.dealer.dealCard());

        const addOcean = () => {
            if (game.noOceansAvailable()) return undefined;
            return new SelectSpace(
                "Select space for ocean tile", 
                game.board.getAvailableSpacesForOcean(player), 
                (foundSpace: ISpace) => {
                    game.addOceanTile(player, foundSpace.id);
                    return undefined;
                }
            )
        }

        const cards = player.getResourceCards(ResourceType.ANIMAL);

        if (cards.length === 0 ) {
            player.plants += 5; 
            return addOcean();
        }

        return new OrOptions(
            new SelectOption(
                "Gain 5 plants", 
                () => { 
                    player.plants += 5; 
                    return addOcean(); 
                }
            ),
            new SelectCard(
                "Select card to add 4 animals", 
                cards, 
                (foundCards: Array<ICard>) => { 
                    player.addResourceTo(foundCards[0], 4);
                    return addOcean();
                }
            )
        );
    }
    public getVictoryPoints() {
        return 2;
    }
}

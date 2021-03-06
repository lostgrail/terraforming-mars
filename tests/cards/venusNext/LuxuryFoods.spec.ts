import { expect } from "chai";
import { LuxuryFoods } from "../../../src/cards/venusNext/LuxuryFoods";
import { Color } from "../../../src/Color";
import { Player } from "../../../src/Player";

describe("LuxuryFoods", function () {
    it("Should play", function () {
        const card = new LuxuryFoods();
        const player = new Player("test", Color.BLUE, false);
        expect(card.canPlay(player)).to.eq(false);
        const action = card.play();
        expect(action).to.eq(undefined);
        player.victoryPoints += card.getVictoryPoints();
        expect(player.victoryPoints).to.eq(2);
    });
});
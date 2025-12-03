import {expect} from "chai";
import add from "../src/add.js";

// Tämä on testi että toimii
describe("addTest", () => {
    it("should return 3 when 1 added to 2",()=>{
        expect(add(2,1)).to.equal(3); 
    }); 
}); // TESTAAN
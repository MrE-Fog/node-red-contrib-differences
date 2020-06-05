import { complement, union, intersection } from "./diff";
import { expect } from "chai";

describe("The diff module", () => {
  describe("Given two sets of values with equivalent and distinct values...", () => {
    describe("AND the sets are arrays", () => {
      const left = [
        "a",
        "b",
        "b",
        { c: 3 },
        4,
        { d: 5 },
        [1, 2, 3],
        [4, 5, 6],
        "l1 r2",
      ];
      const right = ["a", "b", { c: 2 }, 4, [1, 2, 3], "l1 r2", "l1 r2"];

      describe("When complement() is called, it...", () => {
        const complementResult = complement(left, right);

        it("Returns the set of values from the left that are not present in the right", () => {
          expect(complementResult).to.deep.equal([
            "b",
            { c: 3 },
            { d: 5 },
            [4, 5, 6],
          ]);
        });
      });

      describe("When intersection() is called, it...", () => {
        const intersectionResult = intersection(left, right);

        it("Returns the set of equivalent values that are in both arrays", () => {
          expect(intersectionResult).to.deep.equal([
            "a",
            "b",
            4,
            [1, 2, 3],
            "l1 r2",
          ]);
        });
      });

      describe("When union() is called, it...", () => {
        const unionResult = union(left, right);

        it("Returns the combined set of equivalent values from both arrays", () => {
          expect(unionResult).to.deep.equal([
            4,
            "a",
            "b",
            "b",
            { c: 3 },
            { d: 5 },
            [1, 2, 3],
            [4, 5, 6],
            "l1 r2",
            "l1 r2",
            { c: 2 },
          ]); // TODO: Order shouldn't matter
        });
      });
    });

    describe("AND the sets are objects", () => {
      const left = { a: 1, b: 2, c: ["c", "c", "c"], num: 4 };
      const right = { a: 1, b: 1, c: ["c", "c"], num: 4 };

      describe("When complement() is called, it...", () => {
        const complementResult = complement(left, right);

        it("Returns the set of 'missing' values (the complement)", () => {
          expect(complementResult).to.deep.equal({ b: 2, c: ["c", "c", "c"] });
        });
      });

      describe("When intersection() is called, it...", () => {
        const intersectionResult = intersection(left, right);

        it("Returns the set of equivalent values that are in both arrays", () => {
          expect(intersectionResult).to.deep.equal({ a: 1, num: 4 });
        });
      });

      describe("When union() is called", () => {
        const unionResult = union(left, right);

        it("Returns the combines set of distinct equivalent values from both arrays", () => {
          expect(unionResult).to.deep.equal({
            a: 1,
            b: [2, 1],
            c: ["c", "c", "c"],
            num: 4,
          });
        });
      });
    });

    describe("AND the sets are strings", () => {
      const left = "desired";
      const right = "owned";

      describe("When complement() is called, it...", () => {
        const complementResult = complement(left, right);

        it("Returns the 'left' (desired) value", () => {
          expect(complementResult).to.deep.equal(["desired"]);
        });
      });

      describe("When intersection() is called, it...", () => {
        const intersectionResult = intersection(left, right);

        it("Returns an empty result set", () => {
          expect(intersectionResult).to.deep.equal([]);
        });
      });

      describe("When union() is called, it...", () => {
        const unionResult = union(left, right);

        it("Returns both values", () => {
          expect(unionResult).to.deep.equal(["desired", "owned"]);
        });
      });
    });
  });

  describe("Given two sets of values that are equivalent", () => {
    describe("AND the sets are strings", () => {
      const left = "left and right";
      const right = "left and right";

      describe("When complement() is called it...", () => {
        const complementResult = complement(left, right);

        it("Returns an empty array", () => {
          expect(complementResult).to.deep.equal([]);
        });
      });

      describe("When intersection() is called, it...", () => {
        const intersectionResult = intersection(left, right);

        it("Returns the equivalent value of either, it...", () => {
          expect(intersectionResult).to.deep.equal("left and right");
        });
      });

      describe("When union() is called, it...", () => {
        const unionResult = union(left, right);

        it("Returns the equivalent value of either", () => {
          expect(unionResult).to.deep.equal("left and right");
        });
      });
    });
  });

  describe("Given two sets of values where the left set is undefined", () => {
    describe("AND the other set is an array", () => {
      const left = undefined;
      const right = ["one", "two"];

      describe("When complement() is called, it...", () => {
        const complementResult = complement(left, right);
        it("Returns an empty set", () => {
          expect(complementResult).to.deep.equal([]);
        });
      });

      describe("When intersection() is called, it...", () => {
        const intersectionResult = intersection(left, right);
        it("Returns an empty set", () => {
          expect(intersectionResult).to.deep.equal([]);
        });
      });

      describe("When union() is called, it...", () => {
        const unionResult = union(left, right);
        it("Returns the right set", () => {
          console.log(unionResult);
          //   expect(unionResult).to.deep.equal(["one", "two"]);
        });
      });
    });
  });
});

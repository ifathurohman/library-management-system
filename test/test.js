const chai = require("chai");
const { expect } = chai;
const Borrowing = require("../app/borrow/model");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("member", () => {
  let member;
  describe("/POST member", () => {
    it("succeeds borrow 1 book!", (done) => {
      chai
        .request("http://localhost:3000")
        .post("/api/member")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          memberId: "660c030d189797f16afd7a8e",
          bookId: "660c030d189797f16afd7a93",
        })
        .end((err, res) => {
          member = res.body;
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done();
        });
    });

    it("succeeds borrow 2 book!", (done) => {
      chai
        .request("http://localhost:3000")
        .post("/api/member")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          memberId: "660c030d189797f16afd7a8e",
          bookId: "660c030d189797f16afd7a91",
        })
        .end((err, res) => {
          member = res.body;
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done();
        });
    });

    it("failed borrow 3 book!", (done) => {
      chai
        .request("http://localhost:3000")
        .post("/api/member")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          memberId: "660c030d189797f16afd7a8e",
          bookId: "660c030d189797f16afd7a92",
        })
        .end((err, res) => {
          member = res.body;
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("/POST return", () => {
    it("Book 1 returned successfully!", (done) => {
      chai
        .request("http://localhost:3000")
        .post("/api/return")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          memberId: "660c030d189797f16afd7a8e",
          bookId: "660c030d189797f16afd7a93",
        })
        .end((err, res) => {
          member = res.body;
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it("Book 2 returned successfully!", (done) => {
      chai
        .request("http://localhost:3000")
        .post("/api/return")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
          memberId: "660c030d189797f16afd7a8e",
          bookId: "660c030d189797f16afd7a91",
        })
        .end((err, res) => {
          member = res.body;
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("/GET books", () => {
    it("Shows all existing books and quantities!", (done) => {
      chai
        .request("http://localhost:3000")
        .get("/api/books")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("/GET member", () => {
    it("Shows all existing members!", (done) => {
      chai
        .request("http://localhost:3000")
        .get("/api/member/all")
        .end((err, res) => {
          member = res.body;
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

var request = require("request");
var expressServer = require("../bin/www")
var base_url = "http://localhost:3000/"

describe("Express Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns Hello World", function(done) {
      request.get('http://localhost:3000/testing', function(error, response, body) {
        expect(body).toBe("Hello World");
        expressServer.closeServer();
        done();
      });
    });
  });
});
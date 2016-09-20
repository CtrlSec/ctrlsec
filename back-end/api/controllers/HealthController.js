module.exports = {
  check: function(req, res) {
    console.log("HEALTH:    ok");
    return res.json({"HEALTH": "ok"});
  }
};

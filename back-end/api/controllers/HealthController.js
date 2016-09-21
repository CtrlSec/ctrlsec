module.exports = {
  check: function(req, res) {
    return res.json({"HEALTH": "ok"});
  }
};

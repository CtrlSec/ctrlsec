var fs = require('fs');
var adapter;
var cmds = {
  'sails-postgresql': {
    file: '/automigrate/schema-postgres.sql',
    q_check_directory: "SELECT * FROM automigrate WHERE directory='@{directory}'",
    q_add_entry: "INSERT INTO automigrate (directory, last_file, updatedAt) VALUES('@{directory}', ' ', now())",
    q_update_entry: "UPDATE automigrate SET last_file='@{last_file}', updatedAt=now() WHERE directory='@{path}'"
  },
  'sails-mysql': {
    file: '/automigrate/schema-mysql.sql',
    q_check_directory: "SELECT * FROM `automigrate` WHERE directory='@{directory}'",
    q_add_entry: "INSERT INTO `automigrate` (directory, last_file, updatedAt) VALUES('@{directory}', ' ', now())",
    q_update_entry: "UPDATE `automigrate` SET last_file='@{last_file}', updatedAt=now() WHERE directory='@{path}'"
  }
};

var exec_query = function (q, cb) {
  adapter.query(sails.config.models.connection, null, q, null, function (err, result) {
    if(err) {
      cb(err);
    } else {
      cb(null, result.rows)
    }
  });
};

var check_if_is_directory = function (list, cb) {
  async.each(list, function (path, callback) {
    fs.lstat(path, function (err, stats) {
      if (err) {
        callback(err);
      } else if (!stats.isDirectory()) {
        callback("Path '"+path+"' is not a directory.");
      } else {
        callback(null);
      }
    });
  }, cb);
};

var load_sql = function (path, cb, print_logs) {
  if (typeof print_logs === 'undefined') { print_logs = true; }

  if (print_logs) {
    console.info("AUTOMIGRATE: Applying " + path);
  }
  var q = fs.readFileSync(path, {encoding: 'utf8'});
  q = q.replace(/\/\*.+\*\/;/g, '');  // Retira comentários do tipo "/* ... */"
  q = q.replace(/--.+/g, '');  // Retira comentários do tipo "-- ..."
  q = q.replace(/--/g, '');  // Retira comentários do tipo "--"
  q = _.trim(q, "\n\r\t ");  // Retira whitespace e excesso de quebra de linha
  var qlist = q.split(";");  // Separa os comandos por ponto-e-vírgula
  if (!Array.isArray(qlist)) {
    qlist = [q];
  }

  async.eachOfSeries(qlist, function (q, n, callback) {
    q = _.trim(q, "\n\r\t ");  // Retira whitespace e excesso de quebra de linha (de novo)
    if(q) {
      exec_query(q, function (err) {
        if (err) {
          if (print_logs) {
            console.info("AUTOMIGRATE:    Statement " + n + ": ERROR!");
          }
          callback(err);
        }
        else {
          if (print_logs) {
            console.info("AUTOMIGRATE:    Statement " + n + ": ok");
          }
          callback(null);
        }
      });
    } else {
      if (print_logs) {
        console.info("AUTOMIGRATE:    Statement " + n + ": empty");
      }
      callback(null);
    }
  }, cb);
};

var ensures_that_table_exists = function (cb) {
  load_sql(sails.config.appPath+cmds[adapter.identity].file, cb, false);
};

var ensures_that_entry_exists = function (entry, cb) {
  var q = cmds[adapter.identity].q_check_directory.replace("@{directory}", entry);
  exec_query(q, function (err, rows) {
    if (err) {
      cb(err);
    } else {
      if (rows.length > 0) {
        cb(null, rows[0].last_file);
      } else {
        var qq = cmds[adapter.identity].q_add_entry.replace("@{directory}", entry);
        exec_query(qq, function (err) {
          if (err) {
            cb(err, null);
          } else {
            cb(null, ' ');
          }
        });
      }
    }
  });
};

var update_entry = function(path, last_file, cb) {
  var q = cmds[adapter.identity].q_add_entry.replace("@{last_file}", last_file).replace("@{path}", path);
  exec_query(q, function (err) {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

var run_migrations = function (list, cb) {

  try {
    ensures_that_table_exists(function (err) {
      if (err) {
        throw err;
      }
      async.eachSeries(list, function (path, callback) {
        ensures_that_entry_exists(path, function (err, last_file) {
          if (err) {
            throw err;
          }
          fs.readdir(path, function (err, files) {
            if (err) {
              throw err;
            }
            var filtered = files.filter(function (file) {
              return (file.startsWith("_")) ? false : file > last_file;
            });

            async.eachSeries(filtered, function (file, cb) {
              load_sql(path+file, function (err) {
                if (err) {
                  throw err;
                }
                update_entry(path, file, cb);
              });
            }, callback);
          });

        });
      }, cb);

    });
  } catch (err) {
    cb(err);
  }
};

module.exports = {
  auto: function (pathlist, cb) {
    adapter = sails.adapters['sails-postgresql'] || sails.adapters['sails-mysql'];
    if (typeof adapter !== 'undefined') {
      if (typeof pathlist === 'string') {
        pathlist = [pathlist];
      }
      if (!Array.isArray(pathlist)) {
        cb("pathlist' is not a string nor array.");
      }

      check_if_is_directory(pathlist, function (err) {
        if (err) {
          cb(err);
        } else {
          run_migrations(pathlist, cb);
        }
      });

    } else {
      cb();
    }
  }
};

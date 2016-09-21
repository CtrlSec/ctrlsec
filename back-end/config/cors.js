module.exports.cors = {
  allRoutes: true,
  origin: '*',
  credentials: true,
  methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  headers: 'content-type, Authorization, Access-Control-Allow-Origin, Cache-Control'
};

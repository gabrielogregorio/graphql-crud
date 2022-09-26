module.exports = async () => {
  process.env.TZ = 'America/Sao_Paulo';
  process.env.DB_MONGO_URI = 'mongodb://127.0.0.1:27017/graphql_crud';
};

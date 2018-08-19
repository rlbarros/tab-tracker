module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'dboam1jq6mqlc4',
    user: process.env.DB_USER || 'gtopputkgyrdaw',
    password:
      process.env.DB_PASSWORD || 'bd5b62af0a5eb3987831a3ec1aca51be0a39858fc10846eb4210558b1650ddfa',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      protocol: process.env.PROTOCOL || 'postgres',
      host: process.env.HOST || 'ec2-54-83-13-119.compute-1.amazonaws.com',
      dialectOptions: {
        ssl: process.env.SSL || true
      }
    }
  }
}

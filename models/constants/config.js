require('dotenv').config();

class Config{

  service(){
      return{
        port: process.env.PORT,
        host: process.env.HOST,
        version: process.env.VERSION,
      }
  }

  mongo(){
      return {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        db: process.env.DB_NAME,
      }
  }

  jwt(){
        return {
            access_key: process.env.JWT_ACCESS_SECRET,
            access_time: process.env.JWT_ACCESS_TIME,
            refresh_key: process.env.JWT_REFRESH_SECRET,
            refresh_time: process.env.JWT_REFRESH_TIME,
        }
  }

  redis() {
    return {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
    }
  }
}

module.exports = Config;
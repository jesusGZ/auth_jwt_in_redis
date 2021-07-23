const rateLimit = require("express-rate-limit");

class response {
  
  success(data) {
    let object = {
      response: { code: 0, data: data, message: "Petición realizada con exito", },
      status: 200,
    };
    return object;
  }

  requestValidation(message) {
    let object = {
      response: { code: 101, data: "S/R", message: message },
      status: 400,
    };
    return object;
  }

  processValidation(message) {
    let object = {
      response: { code: 102, data: "error", message: message },
      status: 400,
    };
    return object;
  }

  duplicateParameter(message) {
    let object = {
      response: { code: 103, data: "error", message: message },
      status: 400,
    };
    return object;
  }

  noResult(message) {
    let object = {
      response: { code: 104, data: "S/R", message: message },
      status: 400,
    };
    return object;
  }

  authentication(message) {
    let object = {
      response: { code: 105, data: "error", message: message },
      status: 401,
    };
    return object;
  }

  authenticationTK(message) {
    let object = {
      response: { code: 106, data: "No Autorizado", message: message },
      status: 401,
    };
    return object;
  }

  longParameter(message) {
    let object = {
      response: { code: 107, data: "error", message: message },
      status: 431,
    };
    return object;
  }

  methodNotAllowed(message) {
    let object = {
      response: { code: 108, data: "error", message: message },
      status: 405,
    };
    return object;
  }

  requestLimit() {
    const reqLimit = rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutos
      max: 10, //peticiones por up dentro de la ventana de tiempo
      message: { code: 109, data: "Limit", message: "Exceso de peticiones" },
  });

    return reqLimit;
  }
  getDuplicateParameter(parameter, message) {
    let object = {
      response: { code: 100, data: parameter, message: message || "Parametro duplicado", },
      status: 400,
    };
    return object;
  }

  dataBase(data) {
    let object = {
      response: { code: 110, data: "S/R", message: "Error conexión fallida" },
      status: 500,
    };
    console.log(data.sqlMessage);
    return object;
  }

  query(data, message) {
    let object = {
      response: { code: 111, data: "S/R", message: message || "Error de petición", },
      status: 500,
    };
    console.log(data.message);
    return object;
  }

  mailer(data) {
    let object = {
      response: { code: 112, data: data, message: "Error al enviar el correo electrónico",
      },
      status: 500,
    };
    return object;
  }

  process(data, msg) {
    let object = {
      response: { code: 113, data: data, message: msg || "Error del servidor", },
      status: 500,
    };
    return object;
  }

  update(data, message) {
    let object = {
      response: { code: 114, data: data, message: message || "Error al actualizar", },
      status: 500,
    };
    return object;
  }

  send(response, obj) {
    return response.status(obj.status).json(obj.response);
  }
}

module.exports = response;

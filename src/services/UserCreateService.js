const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserCreateService {
  constructor(userRepository){
    // o userRepository que sesta sendo recebido
    // esta sendo passado para a classe como um todo
    // utilizando o this. 
    // com o mesmo nome de variavel userRepository
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {

    // removemos a linha de instancia
    // e agora usamos o this
    // pois ele esta sendo recebido via paramentro

    const checkUserExists = await this.userRepository.findByEmail(email);

    if(checkUserExists){
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await this.userRepository.create({ name, email, password: hashedPassword });
  }
}

module.exports = UserCreateService;
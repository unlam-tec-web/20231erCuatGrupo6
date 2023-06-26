import { Request, Response } from "express";
import { AuthService } from "../../domain/auth";
import nodeMailer from "nodemailer";
import { User } from "../../domain/auth/user.interface";
export class AuthController {
  readonly #authService: AuthService;

  constructor() {
    this.#authService = new AuthService();
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    Promise.resolve(this.#authService.login(email, password))
      .then((user) => {
        if (!user) {
          res.status(401).send({ message: "Email o contraseña incorrectos" });
          return;
        }

        // if(!user.email || !user.password){
        //   res.status(401).send({ message: "El usuario o la contraseña son incorrectos" });
        //   return;
        // }
        if (!user.status) {
          res.status(401).send({ message: "Usuario no confirmado" });
          return;
        }

        res.status(200).send(user);
      })
      .catch((err) => {
        console.error(`Error found ${err.message}`);
        res.status(500).send({ error: "Error getting user by id." });
      });
  }

  public async register(req: Request, res: Response): Promise<void> {
    const { name, surname, email, password, address } = req.body;

    // Verificar si el correo electrónico ya está registrado
    const isEmailTaken: boolean = await this.#authService.checkIfEmailExists(
      email
    );
    if (isEmailTaken) {
      res
        .status(401)
        .send({ message: "El correo electrónico ya está registrado." });
      return;
    }

    // Llamada al método de registro del AuthService
    await this.#authService.register(name, surname, email, password, address);

    //si lo registro obtenelo y envialo
    const userId: User | null = await this.#authService.findEmail(email);

    if (userId === null) {
      res
        .status(401)
        .send({ message: "No se pudo registrar al usuario correctamente." });
      return;
    }

    const confirmationCode = generateConfirmationCode(); // Genera un código de confirmación único
    const statusUser = false; // El estado de confirmación se establece en falso por defecto
    await this.#authService.saveConfirmationCode(
      userId.id,
      confirmationCode,
      statusUser
    ); // Guarda el código de confirmación en la base de datos o en otro almacenamiento

    // Aquí puedes enviar el correo de confirmación con el código generado
    sendConfirmationEmail(email, confirmationCode);

    res.status(200).send({ message: "Usuario creado correctamente" });
  }

  public async verifyUser(req: Request<{ confirmationCode: string }>, res: Response): Promise<void> {
    const user = await this.#authService.findUserByConfirmationCode(req.params.confirmationCode);
    console.log(user);
    if (!user) {
      res.status(401).send({ message: "Código de confirmación no válido." });
      return;
    }
    if (user.status) {
      res.status(401).send({ message: "El usuario ya ha sido confirmado." });
      return;
    }
    await this.#authService.updateUserStatus(user.id, true);
    res.status(200).send({ message: "Usuario confirmado correctamente." });
  }
}

function generateConfirmationCode(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codeLength = 8;
  let code = "";
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

function sendConfirmationEmail(email: string, confirmationCode: string): void {
  const transporter = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      user: "yairolivait@gmail.com",
      pass: "hdgoyrzpnahbpiqc",
    },
  });

  transporter.verify((err, success) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Your config is correct", success);
  });

  const mailOptions = {
    from: "Remitente",
    to: email,
    subject: "Confirmación de correo electrónico",
    html: `<p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
    <a href=http://localhost:4200/confirm/${confirmationCode}> Click here</a>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(info);
  });
}

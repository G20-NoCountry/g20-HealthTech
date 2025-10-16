import { Strategy as LocalStrategy } from 'passport-local';
import { compareSync } from 'bcrypt';
import passport from 'passport';
// import { User } from '../databases/models/user.model';

export const passportConfig = passport;

passportConfig.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    async (email: string, password: string, done) => {
        try {
            // const user = await User.findOne({ where: { email: email } });
            // if (!user) {
            //     return done(null, false, { message: "Usuario no encontrado" });
            // }

            // const isValid = compareSync(password, user.toJSON().password);
            // if (!isValid) {
            //     return done(null, false, { message: "Contraseña incorrecta" });
            // }

            return done(null, { email: email });
        } catch (err) {
            return done(err);
        }
    }
));

passportConfig.serializeUser((user: any, done) => {
    done(null, user.email);
});

passportConfig.deserializeUser(async (id: number, done) => {
    try {
        // const user = await User.findOne({ where: { id: id } });
        done(null, { id: id });
    } catch (err) {
        done(err);
    }
});
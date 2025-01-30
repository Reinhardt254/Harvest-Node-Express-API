import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prismadb from "../../utils/prisma";

// JWT strategy configuration
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.JWT_SECRET || 'your-secret-key'
};

// Initialize passport and configure JWT strategy
passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
   try {
      // Here you would typically verify the user exists in your database
      const user = await prismadb.user.findFirst({
         where: {
            id: jwtPayload.id
         }
      })

      if(user){
         return done(null, user)
      }

      return done(null, jwtPayload);
   } catch (error) {
      return done(error, false);
   }
}));

export default passport;

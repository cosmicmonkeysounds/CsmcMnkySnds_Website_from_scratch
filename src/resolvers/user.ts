import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Resolver, Mutation, Arg, InputType, Field, Ctx, ObjectType, Query } from "type-graphql";
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {

    @Field()
    username: string

    @Field()
    password: string

}

@ObjectType()
class FieldError {
   
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class UserResponse {

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;

}

@Resolver()
export class UserResolver {

    @Query(() => User, { nullable: true })
    async me(@Ctx() { em, req }: MyContext) {

        if (!req.session.userId){
            return null;  // not logged in 
        }

        const user = await em.findOne(User, {id: req.session.userId});
        return user;
    }

    @Mutation(() => UserResponse)
    async register (
        @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
        @Ctx() { em, req }: MyContext ) : Promise<UserResponse> {
            
            if (options.username.length <= 2) {
                return {
                    errors: [{
                        field: "username",
                        message: "username length must be greater than 2",
                    }]
                }
            }

            if (options.password.length <= 6) {
                return {
                    errors: [{
                        field: "password",
                        message: "password length must be greater than 6",
                    }]
                }
            }

            const hashedPassword = await argon2.hash(options.password);

            const user = em.create(User, {
                username: options.username,
                password: hashedPassword
            });
            
            try {
                await em.persistAndFlush(user);
            } catch (err) {
                if (err.code = '23505' || err.detail.includes("already exists")) {
                    return {
                        errors: [{
                            field: "username",
                            message: "that username has already been taken"
                        }]
                    }
                }
            }

            req.session.userId = user.id; // logs you in 
            return { user };
        }

    @Mutation(() => UserResponse)
    async login (
        @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
        @Ctx() { em, req }: MyContext ) : Promise<UserResponse> {
            
            const user = await em.findOne(User, { username: options.username }); // case sensitive!
            
            if (!user) {
                return {
                    errors: [{ 
                        field: 'username',
                        message: "username doesn't exist"  
                    }]
                }
            }

            const valid = await argon2.verify(user.password, options.password);
            
            if (!valid) {
                return {
                    errors: [{
                        field: "password",
                        message: "incorrect password"
                    }]
                }
            }

            req.session.userId = user.id;
            
            return {
                user
            };

        }
}


